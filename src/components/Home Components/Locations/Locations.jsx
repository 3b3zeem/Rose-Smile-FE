import React from "react";

const Locations = () => {
  return (
    <div className="container flex flex-col mx-auto md:flex-row items-center justify-center gap-6 py-12">
      {/* Google Map */}
      <div className="w-full md:w-2/3 h-[450px] rounded-lg overflow-hidden shadow-md">
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3251.325134391754!2d33.81347467507598!3d27.253660876445558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14528732a38d8c6d%3A0x38eafe2c073b7fe5!2sSmiley%20Rose!5e1!3m2!1sen!2seg!4v1743709442853!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe> */}

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.205286364491!2d39.8855559!3d21.3560044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c205a75fa29ceb%3A0x34e397f5afaaf369!2z2YXYrNmF2Lkg2KfYqNiq2LPYp9mF2Kkg2KfZhNmI2LHZiNivINmE2LfYqCDYp9mE2KPYs9mG2KfZhg!5e1!3m2!1sen!2seg!4v1743798400060!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Box on the Right */}
      <div className="w-full md:w-1/3 bg-white shadow-lg p-6 rounded-lg border border-purple-500 text-right">
        <h2 className="text-xl font-bold text-gray-800 mb-4">موقعنا</h2>
        <div className="border-t border-gray-300 pt-4">
          <h3 className="font-semibold">Rose Smile</h3>
          <p className="text-gray-600 text-sm">
            مجمع ابتسامة الورود لطب الأسنان
          </p>
          <p className="text-gray-500 text-sm">
            Ibrahim Al Joufaili, Makkah 24211, Saudi Arabia
          </p>
        </div>
        <div className="mt-4">
          <a
            href="https://maps.app.goo.gl/s9EF6BEmVHMHEfKx6?g_st=com.google.maps.preview.copy"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
          >
            عرض على الخريطة
          </a>
        </div>
      </div>
    </div>
  );
};

export default Locations;
