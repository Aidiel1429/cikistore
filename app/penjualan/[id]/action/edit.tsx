import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

interface EditProps {
  params: { id: string };
  reload: () => void;
  alert: (show: boolean) => void;
  row: {
    id: number;
    pendapatan: string;
    modal: string;
    nama: string;
    namaPelanggan: string;
    kategori: string;
    tanggal: string | Date;
    status: string;
  };
}

const getToday = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDate = (date: string | Date | undefined): string => {
  if (!date) return getToday(); // Default to today's date if no date is provided

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Edit = ({ params, reload, alert, row }: EditProps) => {
  const [pendapatan, setPendapatan] = useState<string>(row.pendapatan);
  const [modal, setModal] = useState<string>(row.modal);
  const [nama, setNama] = useState<string>(row.nama);
  const [namaPelanggan, setNamaPelanggan] = useState<string>(row.namaPelanggan);
  const [kategori, setKategori] = useState<string>(row.kategori);
  const [tanggal, setTanggal] = useState<string>(formatDate(row.tanggal)); // Format the date correctly
  const [status, setStatus] = useState<string>(row.status);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEdit = async (e: React.FormEvent) => {
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

      const res = await axios.put(`/api/penjualan/${row.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.pesan === "sukses") {
        alert(true);
        reload();
        setIsOpen(false);
        setPendapatan("");
        setModal("");
        setNama("");
        setNamaPelanggan("");
        setKategori("");
        setTanggal(getToday());
        setStatus("");
      }
    } catch (error) {
      console.log("Terjadi Kesalahan", error);
    }
  };

  const handleModal = () => {
    setTanggal(formatDate(row.tanggal)); // Ensure the date is formatted correctly when opening the modal
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-warning text-white" onClick={handleModal}>
        <FaEdit />
      </button>
      <dialog id="my_modal_1" className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Edit</h3>
          <form onSubmit={handleEdit}>
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
                value={tanggal} // Make sure the value is in 'YYYY-MM-DD' format
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
              <button className="btn btn-warning" type="submit">
                Edit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Edit;
