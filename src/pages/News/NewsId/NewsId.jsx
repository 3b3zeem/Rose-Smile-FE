import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import { Link, useParams } from "react-router-dom";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { NewById } from "../../../hooks/News/UseNews";

export default function News() {
  const { newId } = useParams();
  console.log(newId);

  const { New } = NewById(newId);

  console.log(newId);

  return (
    <>
      <div className="container my-5" style={{ direction: "rtl" }}>
        <div className="row">
          <div className="col-md-9">
            <>
              <div className="cardImage">
                <img
                  style={{ width: "90%", height: "90%" }}
                  src={New.image?.backgroundLarge}
                  alt={New.title}
                  className="cardImage"
                />
              </div>

              <div key={New.id} className="news-item">
                <h5 className="news-date mt-3 mb-2">
                  <AccessTimeFilledIcon />
                  {new Date(New.createdAt).toLocaleDateString("ar-EG")}
                </h5>
                <h2>{New.title}</h2>
                <h4>{New.subTitle}</h4>

                {New.desc?.map((descItem) => (
                  <p key={descItem._id} className="news-description">
                    {descItem}
                  </p>
                ))}

                <Link
                  to={`/service/${New.service?._id}`}
                  className="btn btn-outline-primary mt-auto"
                >
                  الخدمة المرتبطة بالخبر
                </Link>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
