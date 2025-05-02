import React from "react";
import UseNews from "../../hooks/News/UseNews";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export default function News() {
  const { data, error, loading } = UseNews();

  console.log(data);

  return (
    <>
      <div className="container my-5" style={{direction: "rtl"}}>

        <div className="row">
          <div className="col-md-9">
            {data.map((news) => (
              <>
                <div className="cardImage">
                  <img
                  style={{width: "80%", height: "80%"}}
                    src={news.image.url}
                    alt={news.title}
                    className="cardImage"
                  />
            
                </div>

                <div key={news.id} className="news-item">
                  <h5 className="news-date mt-3 mb-2">
                    
                  <AccessTimeFilledIcon/>
                    {new Date(news.createdAt).toLocaleDateString("ar-EG")}</h5>
                  <h2>{news.title}</h2>
                  <h4>{news.subTitle}</h4>
                  <p>{news.desc}</p>
                  <Link style={{ fontSize:"19px"}} to={`/service/${news.service._id}`} className="btn btn-primary p-2">
                              للذهاب إلى الخدمة المتعلقة بالخبر
                  </Link>
                </div>
              </>
            ))}
            
          </div>

          {/* <div className="col-md-3">
            <h2> Recent POsts </h2>
          </div>
 */}
        </div>

      </div>
    </>
  );
}
