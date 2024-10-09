import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface TambahProps {
  params: { id: string };
  reload: () => void; // Tipe fungsi reload yang diperbaiki
  alert: (show: boolean) => void; // Tipe fungsi alert yang diperbaiki
}

const getToday = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const Tambah = ({ params, reload, alert }: TambahProps) => {
  const [pendapatan, setPendapatan] = useState("");
  const [modal, setModal] = useState("");
  const [nama, setNama] = useState("");
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [kategori, setKategori] = useState("");
  const [tanggal, setTanggal] = useState(getToday());
  const [status, setStatus] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("pendapatan", pendapatan);
      formData.append("modal", modal);
      formData.append("nama", nama);
      formData.append("namaPelanggan", namaPelanggan);
      formData.append("kategori", kategori);
      formData.append("tanggal", tanggal);
      formData.append("status", status);
      formData.append("transaksiId", params.id);

      const res = await axios.post("/api/penjualan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.pesan === "sukses") {
        if (status === "Lunas") {
          setIsOpen(false);
          alert(true); // Menggunakan fungsi alert
          reload(); // Menggunakan fungsi reload
          setPendapatan("");
          setModal("");
          setNama("");
          setNamaPelanggan("");
          setKategori("");
          setTanggal(getToday());
          setStatus("");
        } else if (status === "Belum Lunas") {
          router.push("/Hutang");
          setIsOpen(false);
          setPendapatan("");
          setModal("");
          setNama("");
          setNamaPelanggan("");
          setKategori("");
          setTanggal(getToday());
          setStatus("");
        }
      }
    } catch (error) {
      console.log("Terjadi Kesalahan", error);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-primary text-white" onClick={handleModal}>
        Tambah
      </button>
      <dialog id="my_modal_1" className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Tambah</h3>
          <form onSubmit={handleSubmit}>
            <div className="border border-slate-700 p-2 rounded-lg mb-5">
              <label className="label">Pendapatan</label>
              <label className="border-b-2 border-slate-600 bg-inherit outline-none w-full p-2 flex items-center gap-2 mb-3 text-green-500">
                Rp
                <input
                  type="text"
                  className="grow bg-inherit outline-none"
                  value={pendapatan}
                  onChange={(e) => setPendapatan(e.target.value)}
                />
              </label>

              <label className="label">Modal</label>
              <label className="border-b-2 border-slate-600 bg-inherit outline-none w-full p-2 flex items-center gap-2 text-red-500">
                Rp
                <input
                  type="text"
                  className="grow bg-inherit outline-none"
                  value={modal}
                  onChange={(e) => setModal(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="label">Nama Item</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Nama Pelanggan</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={namaPelanggan}
                onChange={(e) => setNamaPelanggan(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Kategori</label>
              <select
                className="select select-bordered w-full"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                <option disabled selected value={""}>
                  Pilih Kategori
                </option>
                <option value={"Pulsa"}>Pulsa</option>
                <option value={"Voucher Game"}>Voucher Game</option>
                <option value={"Uang Digital"}>Uang Digital</option>
              </select>
            </div>
            <div>
              <label className="label">Tanggal</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Status</label>
              <select
                className="select select-bordered w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option disabled selected value={""}>
                  Pilih Status
                </option>
                <option value={"Lunas"}>Lunas</option>
                <option value={"Belum Lunas"}>Belum Lunas</option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" type="button" onClick={handleModal}>
                Tutup
              </button>
              <button className="btn btn-primary" type="submit">
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
