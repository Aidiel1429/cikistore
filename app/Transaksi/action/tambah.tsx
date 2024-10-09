import axios from "axios";
import React, { useState } from "react";

// Definisikan tipe untuk reload function
type ReloadFunction = () => void;

const Tambah = ({ reload }: { reload: ReloadFunction }) => {
  const [modal, setModal] = useState(false);
  const [nama, setNama] = useState("");

  const handleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // Tambahkan tipe untuk event
    e.preventDefault(); // Mencegah reload halaman
    const formData = new FormData();
    formData.append("nama", nama);

    try {
      const res = await axios.post("/api/transaksi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.pesan === "sukses") {
        setModal(false);
        reload();
        setNama("");
      } else {
        console.log("Terjadi Kesalahan");
      }
    } catch (error) {
      console.error("Error saat mengirim data:", error); // Menangani kesalahan
    }
  };

  return (
    <div>
      <button className="btn btn-primary text-white" onClick={handleModal}>
        Tambah
      </button>
      <dialog className={modal ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Tambah</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nama" className="label">
              Nama Transaksi
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Masukkan Nama Transaksi"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <div className="modal-action">
              <button className="btn" type="button" onClick={handleModal}>
                Close
              </button>
              <button className="btn btn-primary text-white" type="submit">
                Tambah
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Tambah;
