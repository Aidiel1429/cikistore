import axios from "axios";
import React, { useState } from "react";

const Tambah = ({ reload }: { reload: Function }) => {
  const [modal, setModal] = useState(false);
  const [nama, setNama] = useState("");

  const handleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nama", nama);

    const res = await axios.post("/api/transaksi", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.pesan === "sukses") {
      setModal(false);
      reload();
    } else {
      console.log("Terjadi Kesalahan");
    }
  };
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
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
