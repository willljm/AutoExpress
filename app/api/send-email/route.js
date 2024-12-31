import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { email, reservaDetails } = await req.json();

    const msg = {
      to: email,
      from: 'tu-email@verificado.com', // Email verificado en SendGrid
      subject: 'Confirmación de Reserva - AutoExpress',
      templateId: 'd-xxxxxxxxxxxxxxxxxxxxxxxx', // ID de tu plantilla en SendGrid
      dynamic_template_data: {
        nombre: reservaDetails.nombre,
        carTitle: reservaDetails.carTitle,
        fechaInicio: new Date(reservaDetails.fechaInicio).toLocaleDateString(),
        fechaFin: new Date(reservaDetails.fechaFin).toLocaleDateString(),
        ciudadRecogida: reservaDetails.ciudadRecogida,
        ciudadDevolucion: reservaDetails.ciudadDevolucion,
        total: reservaDetails.total,
        confirmationNumber: reservaDetails.confirmationNumber
      }
    };

    await sgMail.send(msg);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
