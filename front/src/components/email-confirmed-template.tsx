import * as React from 'react';

interface EmailConfirmedProps {
  name: string;
  date: string;
  time: string;
  service: string;
}

export const EmailConfirmedTemplate: React.FC<Readonly<EmailConfirmedProps>> = ({
  name,
  date,
  time,
  service,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      <h1 style={{ color: '#16a34a', margin: 0 }}>Захиалга Баталгаажлаа! 🎉</h1>
      <p style={{ fontSize: '16px', color: '#666' }}>Таны урьдчилгаа төлбөр амжилттай хийгдлээ.</p>
    </div>
    
    <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#166534' }}>Таны цаг албан ёсоор бүртгэгдлээ:</h3>
      <p style={{ margin: '8px 0' }}><strong>👤 Нэр:</strong> {name}</p>
      <p style={{ margin: '8px 0' }}><strong>📅 Огноо:</strong> {date}</p>
      <p style={{ margin: '8px 0' }}><strong>⏰ Цаг:</strong> {time}</p>
      <p style={{ margin: '8px 0' }}><strong>📷 Үйлчилгээ:</strong> {service}</p>
    </div>

    <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
      <p style={{ fontWeight: 'bold' }}>⚠️ Санамж:</p>
      <ul style={{ paddingLeft: '20px', color: '#555' }}>
        <li>Та цагаасаа 10 минутын өмнө ирнэ үү.</li>
        <li>Хэрэв цагаа цуцлах бол 24 цагийн өмнө мэдэгдэх шаардлагатай.</li>
        <li>Студийн байршил: БЗД, Кино үйлдвэр, Отгонтэнгэр их сургуулиас зүүн тийш 100 метрт CENTURY APARTMENT гэсэн өндөр ногоон барилгын 4 давхарт (урд талын шилэн лифтээр дээш гарнаа)</li>
      </ul>
    </div>
    
    <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '12px', color: '#999' }}>
      Zoe Self Photo Studio
    </p>
  </div>
);