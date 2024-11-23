"use client";
import React, { useState } from "react";
import axios from "axios";
import Loading from "@/app/components/loadingButton";
import { FiEdit } from "react-icons/fi";

interface EditProps {
  setSukses: (value: boolean) => void;
  setError: (value: boolean) => void;
  setMessage: (message: string) => void;
  reload: () => void;
  id: number;
  nama: string;
}

const Edit = ({
  setSukses,
  setError,
  setMessage,
  reload,
  id,
  nama,
}: EditProps) => {
  const [modal, setModal] = useState(false);
  const [namaBaru, setNama] = useState(nama);
  const [validate, setValidate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nama.length === 0) {
      setValidate("Nama transaksi harus diisi!");
      return;
    }

    if (nama.length > 15) {
      setValidate("Nama terlalu panjang!");
      return;
    }

    setValidate("");
    setLoading(true);
    try {
      const res = await axios.put(`/api/transaksi/${id}`, {
        nama: namaBaru || nama,
      });

      if (res.data.pesan === "berhasil") {
        setSukses(true);
        setError(false);
        setMessage("Berhasil mengedit transaksi!");
        setNama("");
        reload();
        setModal(false);
      } else {
        setSukses(false);
        setError(true);
        setMessage("Gagal mengedit transaksi!");
        setModal(false);
      }
    } catch (error) {
      setSukses(false);
      setError(true);
      setMessage("gagal terhubung ke server!");
      setModal(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button onClick={toggleModal} className="text-yellow-500 text-lg">
        <FiEdit />
      </button>
      <dialog id="my_modal_1" className={modal ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Transaksi!</h3>
          <form onSubmit={handleEdit}>
            <label className="label">Nama Transaksi</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={namaBaru}
              onChange={(e) => setNama(e.target.value)}
            />
            {validate && <p className="text-red-500 text-sm">{validate}</p>}
            <div className="modal-action">
              <button className="btn" type="button" onClick={toggleModal}>
                Tutup
              </button>
              <button className="btn btn-warning text-white" type="submit">
                {loading ? <Loading /> : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Edit;
