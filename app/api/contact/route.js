import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializar o Resend com a API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstname, lastname, email, phone, service, message } = body;

    // Validar campos obrigatórios
    if (!firstname || !lastname || !email || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios em falta' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Mapear serviço para texto legível
    const serviceMap = {
      'est': 'Web Development',
      'cst': 'UI/UX Design',
      'mst': 'Data Structure'
    };

    const serviceName = serviceMap[service] || service || 'Não especificado';

    // Criar conteúdo do email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1c1c22; color: white;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00ff99; margin: 0;">Nova Mensagem de Contacto</h1>
          <p style="color: #ffffff60; margin: 5px 0 0 0;">Portfolio Fernando Gonçalves</p>
        </div>
        
        <div style="background-color: #27272c; padding: 25px; border-radius: 10px; border: 1px solid #ffffff10;">
          <h2 style="color: #00ff99; margin-top: 0;">Informações do Contacto</h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Nome:</strong> ${firstname} ${lastname}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Telefone:</strong> ${phone || 'Não fornecido'}</p>
            <p style="margin: 5px 0;"><strong>Serviço:</strong> ${serviceName}</p>
          </div>
          
          <div>
            <h3 style="color: #00ff99; margin-bottom: 10px;">Mensagem:</h3>
            <p style="background-color: #1c1c22; padding: 15px; border-radius: 5px; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ffffff10;">
          <p style="color: #ffffff60; font-size: 12px; margin: 0;">
            Esta mensagem foi enviada através do formulário de contacto do portfolio<br/>
            Data: ${new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Zurich' })}
          </p>
        </div>
      </div>
    `;

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Fernando Gonçalves <onboarding@resend.dev>',
      to: ['fernandojcg22@gmail.com'],
      subject: `Nova Mensagem de Contacto - ${firstname} ${lastname}`,
      html: emailContent,
      replyTo: email
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error sending message. Try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!',
        data 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
