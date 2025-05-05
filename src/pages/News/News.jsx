import React, { useEffect, useState } from "react";
import UseNews from "../../hooks/News/UseNews";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useSearchParams } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export default function News() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const { data, error, loading } = UseNews(page);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = data.filter((news) =>
      news.title.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const handlePageChange = (newPage) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage);
    window.history.pushState({}, "", `?${newSearchParams.toString()}`);
  };

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(data.length / 3), // Assuming 3 items per page
    totalItems: data.length,
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        حدث خطأ أثناء تحميل الأخبار
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ direction: "rtl" }}>
      <div className="row g-4">
        <div className="form">
          <div className="input-group mb-3" style={{ width: "500px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="بحث عن خبر"
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={handleChange}
            />
          </div>
        </div>
        {filteredData.map((news) => (
          <div key={news._id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={news.image.url}
                alt={news.title}
                className="card-img-top"
                style={{ objectFit: "cover", height: "250px" }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="text-muted mb-2">
                  <AccessTimeFilledIcon fontSize="small" />{" "}
                  {new Date(news.createdAt).toLocaleDateString("ar-EG")}
                </h6>
                <h5 className="card-title fw-bold">{news.title}</h5>
                <h6 className="text-secondary mb-2 truncate">
                  {news.subTitle}
                </h6>
                <Link
                  to={`/news/${news._id}`}
                  className="btn btn-outline-primary mt-auto"
                >
                  تفاصيل الخبر
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8 items-center">
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.totalPages || loading}
            className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 cursor-pointer hover:bg-blue-500 transition-all duration-200"
          >
            التالي
          </button>
          <span className="text-gray-600">
            الصفحة {page} من {pagination.totalPages}
          </span>

          <button
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
            disabled={page === 1 || loading}
            className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 cursor-pointer hover:bg-blue-500 transition-all duration-200"
          >
            السابق
          </button>
        </div>
      )}
    </div>
  );
}
