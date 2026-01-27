import * as React from 'react';

interface AdminEmailProps {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
}

export const AdminEmailTemplate: React.FC<Readonly<AdminEmailProps>> = ({
  name,
  phone,
  email,
  service,
  date,
  time,
  guests,
  notes,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
      <h2 style={{ color: '#000', margin: 0 }}>📸 Шинэ захиалга ирлээ!</h2>
    </div>
    
    <p style={{ fontSize: '16px' }}>
        <strong>{name}</strong> хэрэглэгч шинээр цаг захиаллаа.
    </p>

    <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h3 style={{ marginTop: 0, color: '#4b5563' }}>Захиалгын мэдээлэл:</h3>
      
      <p style={{ margin: '8px 0' }}><strong>📅 Огноо:</strong> {date} | {time}</p>
      <p style={{ margin: '8px 0' }}><strong>📷 Багц:</strong> {service}</p>
      <p style={{ margin: '8px 0' }}><strong>👥 Хүний тоо:</strong> {guests}</p>
      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '15px 0' }} />
      
      <h3 style={{ marginTop: 0, color: '#4b5563' }}>Холбоо барих:</h3>
      <p style={{ margin: '8px 0' }}><strong>📞 Утас:</strong> <a href={`tel:${phone}`} style={{color: '#2563eb'}}>{phone}</a></p>
      <p style={{ margin: '8px 0' }}><strong>📧 И-мэйл:</strong> {email || 'Байхгүй'}</p>
      
      {notes && (
        <>
            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '15px 0' }} />
            <h3 style={{ marginTop: 0, color: '#4b5563' }}>📝 Тэмдэглэл:</h3>
            <p style={{ background: '#fff', padding: '10px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                {notes}
            </p>
        </>
      )}
    </div>

    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <a 
        href="http://localhost:3000/admin" 
        style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '12px 25px',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            display: 'inline-block'
        }}
      >
        Админ самбар руу орох
      </a>
      <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '20px' }}>
        Жич: Интернетэд байршуулсны дараа холбоосоо солихоо мартуузай.
      </p>
    </div>
  </div>
);