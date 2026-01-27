import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  date: string;
  time: string;
  service: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  date,
  time,
  service,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
    <h1 style={{ color: '#000' }}>Сайн байна уу, {name}! 👋</h1>
    <p>Zoe Slef Photo Studio-д зураг авалтын захиалга өгсөнд баярлалаа.</p>
    
    <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Захиалгын дэлгэрэнгүй:</h3>
      <p><strong>📅 Огноо:</strong> {date}</p>
      <p><strong>⏰ Цаг:</strong> {time}</p>
      <p><strong>📷 Багц:</strong> {service}</p>
    </div>

    <div style={{ background: '#fff7ed', padding: '20px', borderRadius: '10px', margin: '20px 0', border: '1px solid #fed7aa' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#9a3412' }}>Төлбөр төлөх заавар:</h3>
      <p>Захиалгаа баталгаажуулахын тулд урьдчилгаа <strong>50%</strong> төлбөрийг доорх дансанд шилжүүлнэ үү.</p>
      
      <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '15px 0' }}>
        Хаан Банк: 5000xxxxxx <br/>
        Нэр: Зое Студи
      </p>
      
      <p style={{ fontSize: '13px', color: '#666' }}>
        Гүйлгээний утга дээр <strong>Утасны дугаараа</strong> бичихээ мартуузай!
      </p>
    </div>

    <p>Бид төлбөрийг шалгасны дараа танд <strong>Баталгаажсан имэйл</strong> илгээх болно.</p>

    <hr style={{ border: 'none', borderTop: '1px solid #eaeaea', margin: '20px 0' }} />
    <p style={{ fontSize: '12px', color: '#666' }}>
      Хэрэв асуух зүйл байвал энэ имэйлд хариу бичээрэй.
    </p>
  </div>
);