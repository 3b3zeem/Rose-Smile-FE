import React from "react";
import UseNews from "../../hooks/News/UseNews";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export default function News() {
  const { data, error, loading } = UseNews();

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">حدث خطأ أثناء تحميل الأخبار</div>;
  }

  return (
    <div className="container my-5" style={{ direction: "rtl" }}>
      <div className="row g-4">
        {data.map((news) => (
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
                <h6 className="text-secondary mb-2 truncate">{news.subTitle}</h6>
                <Link
                  to={`/news/${news._id}`}
                  className="btn btn-outline-primary mt-auto"
                >
                  الذهاب إلى الخدمة المرتبطة
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
