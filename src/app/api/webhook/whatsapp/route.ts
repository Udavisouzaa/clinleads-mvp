import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const webhookSecret = process.env.WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('WEBHOOK_SECRET não configurado.');
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const authHeader = req.headers.get('Authorization') || req.headers.get('x-api-key');
    const receivedToken = authHeader?.replace(/^Bearer\s+/i, '');

    if (!receivedToken || receivedToken !== webhookSecret) {
      console.warn('❌ [Webhook] Tentativa de acesso não autorizada');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const senderNumber = body?.data?.key?.remoteJid || body?.sender;
    const messageContent = body?.data?.message?.conversation || body?.message;

    if (!senderNumber || !messageContent) {
      console.log('⚠️ [Webhook] Payload incompleto ou evento sem mensagem de texto.');
      return NextResponse.json({ received: true, ignored: true }, { status: 200 });
    }

    console.log('📱 Nova mensagem recebida de ' + senderNumber);

    // Próximas etapas:
    // - Persistir o lead e a mensagem no Supabase.
    // - Gerar a resposta com IA usando somente os dados necessários.
    // - Enviar a resposta pelo provedor de WhatsApp.

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('❌ [Webhook] Erro ao processar:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
