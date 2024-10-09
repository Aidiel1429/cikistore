import axios from "axios";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface ComponentProps {
  id: number;
  reload: () => Promise<void>;
}

const Hapus = ({ id, reload }: ComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleHapus = async () => {
    try {
      const res = await axios.delete(`/api/transaksi/${id}`);
      if (res.data.pesan === "sukses") {
        setIsOpen(false);
        reload();
      } else {
        console.log("Terjadi kesalahan");
      }
    } catch (error) {
      console.error("Error saat menghapus data:", error);
    }
  };

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn btn-error text-center" onClick={handleModal}>
        <FaTrash />
      </button>
      <dialog id="my_modal_1" className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box text-start">
          <h3 className="font-bold text-lg">Hapus</h3>
          <p className="py-4">Apakah anda yakin ingin hapus transaksi ini?</p>
          <div className="modal-action">
            <button className="btn" onClick={handleModal}>
              Close
            </button>
            <button className="btn btn-error" onClick={handleHapus}>
              Hapus
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Hapus;
