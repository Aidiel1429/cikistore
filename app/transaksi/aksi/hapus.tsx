"use client";
import Loading from "@/app/components/loadingButton";
import axios from "axios";
import React, { useState } from "react";
import { LuTrash } from "react-icons/lu";

// Explicitly define the function types
interface HapusProps {
  setSukses: (sukses: boolean) => void;
  setError: (error: boolean) => void;
  setMessage: (message: string) => void;
  reload: () => void;
  id: number;
}

const Hapus = ({ setSukses, setError, setMessage, reload, id }: HapusProps) => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleHapus = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/transaksi/${id}`);
      if (res.data.pesan === "berhasil") {
        setSukses(true);
        setError(false);
        setMessage("Berhasil mengahapus data!");
        reload();
        setModal(false);
      } else {
        setSukses(false);
        setError(true);
        setMessage("Gagal mengahapus data!");
        reload();
        setModal(false);
      }
    } catch (error) {
      setSukses(false);
      setError(true);
      setMessage("Gagal tersambung ke server!");
      reload();
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
      <button className="text-red-500 text-xl" onClick={toggleModal}>
        <LuTrash />
      </button>
      <dialog id="my_modal_1" className={modal ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hapus data!</h3>
          <p className="py-4">Anda yakin ingin hapus data iniiii?</p>
          <div className="modal-action">
            <button className="btn" onClick={toggleModal}>
              Tutup
            </button>
            <button className="btn btn-error text-white" onClick={handleHapus}>
              {loading ? <Loading /> : "Hapus"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Hapus;
