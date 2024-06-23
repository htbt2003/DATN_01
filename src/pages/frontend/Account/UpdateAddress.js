import { useEffect, useState } from "react";
import AddressServices from '../../../services/AddressServices';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import swal from "sweetalert";
import Sidebar from "./Sidebar";

const UpdateAddress = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const user_id = useSelector((state) => state.auth.user.id)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState();
  const [statusDefault, setDefault] = useState();
  useEffect(function () {
    (async function () {
      const result = await AddressServices.getById(id)
      const tmp = result.address
      setName(tmp.name);
      setPhone(tmp.phone);
      setAddress(tmp.address);
      setStatus(tmp.status);
      setDefault(tmp.status);
    })();
  }, []);
  function AddressUpdate(event) {
    event.preventDefault();//không load lại trang
    var addr = new FormData();
    addr.append("user_id", user_id)
    addr.append("name", name)
    addr.append("phone", phone)
    addr.append("address", address)
    addr.append("status", status)
    AddressServices.update(addr, id)
      .then(function (result) {
        swal("Success", result.message, "success");
        navigator("/tai-khoan/so-dia-chi", { replace: true })
      });
  }
  console.log(status)
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">
            My Account<span>Shop</span>
          </h1>
        </div>
        {/* End .container */}
      </div>
      {/* End .page-header */}
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Shop</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              My Account
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <Sidebar />
              {/* End .col-lg-3 */}
              <div className="col-md-8 col-lg-10 bg-light">
                <section className="content-body p-5">
                  <form method="post" onSubmit={AddressUpdate}>
                    {/* <p className="text-center">Already have an account? <a href="#">Log in instead!</a></p> */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label>
                            <strong>Họ tên người nhận (*)</strong>
                          </label>
                          <input
                            value={name} onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="name"
                            className="form-control bg-white"
                            placeholder="Họ tên"
                          />
                        </div>
                        <div className="mb-3">
                          <label>
                            <strong>Điện thoại(*)</strong>
                          </label>
                          <input
                            value={phone} onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            name="phone"
                            className="form-control bg-white"
                            placeholder="Điện thoại"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label>
                            <strong>Địa chỉ nhận hàng(*)</strong>
                          </label>
                          <input
                            value={address} onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="form-control bg-white"
                            placeholder="Đại chỉ nhận hàng"
                          />
                        </div>
                        <div className="mb-3">
                          <div>
                              <strong>Địa chỉ mặc định</strong>
                            </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              defaultValue="option1"
                              value="1"
                              checked={status === "1"}
                              onChange={(e) => setStatus(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">
                              Mở
                            </label>
                          </div>
                          {
                            statusDefault == 1 ?
                            (
                              <div className="ml-5 form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              defaultValue="option2"
                              value="0"
                              checked={status === "0"}
                              onChange={(e) => swal("Cảnh báo", "Rất tiếc, nếu muốn tắt địa chỉ mặc định này, vui lòng chọn một đạic chỉ khác để mặc định", "warning")}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio2">
                              Tắt
                            </label>
                          </div>
                            ):
                            (
                              <div className="ml-5 form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              defaultValue="option2"
                              value="0"
                              checked={status === "0"}
                              onChange={(e) => setStatus(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio2">
                              Tắt
                            </label>
                          </div>
                            )
                          }
                          
                        </div>

                      </div>

                    </div>

                    <button className="btn btn-primary btn-rounded btn-shadow" type="submit">
                      <i className="icon-long-arrow-right" /> Lưu
                    </button>

                  </form>
                </section>

              </div>

            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .dashboard */}
      </div>
      {/* End .page-content */}
    </main>


  );
}

export default UpdateAddress;

