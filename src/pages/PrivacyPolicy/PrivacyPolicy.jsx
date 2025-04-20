import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white max-w-6xl mx-auto p-4 md:p-8 text-right">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
        سياسة الخصوصية لبيانات المستخدمين والشروط والأحكام
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">مقدمة</h2>
        <p className="text-gray-600">
          .نشكرك على اهتمامك واختيارك لنا في مجمع عيادات ابتسامة الورود فرع مكة
          المكرمة
          <br /> <br />. نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية ونرغب في أن
          تكون على علم بكيفية جمع واستخدام ومشاركة هذه البيانات والمعلومات{" "}
          <br /> <br /> :يرجى قراءة سياسة الخصوصية التالية بعناية
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          :أولا : جمع البيانات الشخصية
        </h2>
        <p className="text-gray-600 mb-2">
          .نقوم بجمع بياناتك الشخصية عندما تقوم بتقديمها لنا عبر موقعنا
          الإلكتروني أو عبر وسائل التواصل الاجتماعي أو عندما تزور عيادتنا شخصياً
          . هذه البيانات قد تتضمن الاسم، ورقم الهاتف، والبريد الإلكتروني،
          وتفاصيل العلاجات التي تم تلقيها أو المقترحة
        </p>
        <ul className="text-gray-600 space-y-2 pr-6 list-none">
          <li>
            <strong>استخدام البيانات :</strong> نستخدم البيانات الشخصية للتواصل
            معك بشأن مواعيد العلاج وتذكيراتها، ولإرسال آخر العروض والأخبار
            المتعلقة بخدمات الأسنان وبالخدمات التجميلية . قد نستخدم أيضًا
            البيانات لتحسين خدماتنا وتجربتك كعميل
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          :ثانياً :مشاركة البيانات
        </h2>
        <p className="text-gray-600">
          .نحن نلتزم بعدم مشاركة بياناتك الشخصية مع أي شركة أو طرف ثالث لأغراض
          تسويقية أو تجارية او اي اغراض اخري
        </p>
        <ul className="text-gray-600 space-y-2 list-none pr-6">
          <li>
            .فقط سيتم مشاركة البيانات مع الجهات الحكومية في حالة طلبها في إطار
            القوانين واللوائح المعمول بها-
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">:ثالثاً: حقوقك</h2>
        <p className="text-gray-600">
          لا نبيع أو نتاجر بمعلوماتك الشخصية. قد نشارك المعلومات مع أطراف ثالثة
          في الحالات التالية:
        </p>
        <ul className="text-gray-600 space-y-2 list-none pr-6">
          <li>
            .لديك الحق في طلب تعديل أو حذف البيانات الشخصية الخاصة بك، وكذلك سحب
            موافقتك على استخدامها في أي وقت-
          </li>
          <li>
            .لديك أيضًا الحق في طلب إلغاء الاشتراك في رسائل الجوال أو البريد
            الإلكتروني أو وسائل التواصل الاجتماعي، أو تحديد الطريقة التي تفضل
            التواصل بها-
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          :رابعاً: الأمان
        </h2>
        <p className="text-gray-600">
          .نحن نتخذ إجراءات أمان صارمة لحماية بياناتك الشخصية من الوصول غير
          المصرح به أو الاستخدام أو التعديل أو الكشف
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          :التحديثات على سياسة الخصوصية
        </h2>
        <p className="text-gray-600">
          قد نقوم بتحديث سياسة الخصوصية من وقت لآخر، وسيتم نشر أي تغييرات على
          موقعنا الإلكتروني وتصبح سارية فور نشرها. يرجى مراجعة سياسة الخصوصية
          بشكل دوري
        </p>
        <ul className="text-gray-600 space-y-2 list-none pr-6">
          <li className="mt-2">
            .إذا كان لديك أي استفسارات أو مخاوف بشأن سياسة الخصوصية، فلا تتردد
            في الاتصال بنا او زيارتنا-
          </li>
          <li>تاريخ السريان: [يناير 2023]-</li>
        </ul>
        <p className="text-gray-600 mt-4">
          .شكرًا لاختيارك مجمع عيادات ابتسامة الورود فرع مكة المكرمة
        </p>
      </section>

      <p className="text-gray-600 text-sm">آخر تحديث: 19 أبريل 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
