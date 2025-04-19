import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white max-w-6xl mx-auto p-4 md:p-8 text-right">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
        سياسة الخصوصية
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">مقدمة</h2>
        <p className="text-gray-600">
          نحن في Rose Smile نحترم خصوصية زوارنا ونلتزم بحماية بياناتهم الشخصية.
          توضح سياسة الخصوصية هذه كيفية جمعنا للمعلومات واستخدامها ومشاركتها
          وحمايتها عند زيارتك لموقعنا الإلكتروني. باستخدامك لموقعنا، فإنك توافق
          على الشروط الواردة في هذه السياسة.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          المعلومات التي نجمعها
        </h2>
        <p className="text-gray-600 mb-2">
          قد نجمع أنواعًا مختلفة من المعلومات، بما في ذلك:
        </p>
        <ul className="text-gray-600 space-y-2 pr-6 list-none">
          <li>
            <strong>المعلومات الشخصية</strong>: مثل الاسم أو البريد الإلكتروني،
            إذا اخترت تقديمها (مثل التسجيل في النشرة الإخبارية).
          </li>
          <li>
            <strong>معلومات غير شخصية</strong>: مثل عنوان IP، نوع المتصفح، أو
            البيانات التي يتم جمعها عبر ملفات تعريف الارتباط (الكوكيز).
          </li>
          <li>
            <strong>بيانات الاستخدام</strong>: معلومات حول كيفية تفاعلك مع
            الموقع، مثل الصفحات التي تزورها أو الروابط التي تنقر عليها.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          كيفية استخدام المعلومات
        </h2>
        <p className="text-gray-600">
          نستخدم المعلومات التي نجمعها للأغراض التالية:
        </p>
        <ul className="text-gray-600 space-y-2 list-none pr-6">
          <li>تحسين تجربة المستخدم وتخصيص المحتوى.</li>
          <li>تحليل أداء الموقع عبر أدوات مثل Google Analytics.</li>
          <li>إرسال نشرات إخبارية أو عروض ترويجية (إذا اشتركت فيها).</li>
          <li>الامتثال للمتطلبات القانونية.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          مشاركة المعلومات
        </h2>
        <p className="text-gray-600">
          لا نبيع أو نتاجر بمعلوماتك الشخصية. قد نشارك المعلومات مع أطراف ثالثة
          في الحالات التالية:
        </p>
        <ul className="text-gray-600 space-y-2 list-none pr-6">
          <li>مع مقدمي خدمات موثوقين (مثل أدوات التحليلات أو التسويق).</li>
          <li>إذا كان ذلك مطلوبًا بموجب القانون أو لحماية حقوقنا القانونية.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          ملفات تعريف الارتباط (الكوكيز)
        </h2>
        <p className="text-gray-600">
          يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح وتتبع سلوك
          المستخدم. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات متصفحك، لكن ذلك
          قد يؤثر على وظائف الموقع. لمزيد من المعلومات، راجع سياسة ملفات تعريف
          الارتباط الخاصة بنا.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">حقوق المستخدم</h2>
        <p className="text-gray-600">
          بموجب قوانين حماية البيانات (مثل GDPR)، يحق لك:
        </p>
        <ul className="text-gray-600 space-y-2 list-none pr-6">
          <li>الوصول إلى بياناتك الشخصية التي نحتفظ بها.</li>
          <li>طلب تصحيح أو حذف بياناتك الشخصية.</li>
          <li>إلغاء الاشتراك في النشرات الإخبارية أو الاتصالات التسويقية.</li>
        </ul>
        <p className="text-gray-600">
          لممارسة هذه الحقوق، يرجى التواصل معنا عبر البريد الإلكتروني الموضح
          أدناه.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">أمن البيانات</h2>
        <p className="text-gray-600">
          نتخذ تدابير أمنية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرح
          به أو الفقدان. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة
          100%، لذا ننصح باتخاذ الحيطة عند مشاركة المعلومات.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          روابط الأطراف الثالثة
        </h2>
        <p className="text-gray-600">
          قد يحتوي موقعنا على روابط لمواقع أخرى. نحن لسنا مسؤولين عن سياسات
          الخصوصية أو الممارسات الخاصة بهذه المواقع. يرجى مراجعة سياسات الخصوصية
          الخاصة بها.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          تحديثات سياسة الخصوصية
        </h2>
        <p className="text-gray-600">
          قد نحدث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه
          الصفحة، وننصحك بمراجعتها بشكل دوري. استمرارك في استخدام الموقع بعد
          التعديلات يعني موافقتك على السياسة المحدثة.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">اتصل بنا</h2>
        <p className="text-gray-600">
          إذا كانت لديك أسئلة أو استفسارات حول سياسة الخصوصية، يرجى التواصل معنا
          عبر البريد الإلكتروني:{" "}
          <a
            href="mailto:info@[yourdomain].com"
            className="text-blue-600 hover:underline"
          >
            info@[yourdomain].com
          </a>
          .
        </p>
      </section>

      <p className="text-gray-600 text-sm">آخر تحديث: 19 أبريل 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
