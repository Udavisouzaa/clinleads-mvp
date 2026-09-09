import { NextResponse } from 'next/server';

// Token de segurança simples. Configure isso no painel da Vercel
// e no seu gateway (Evolution API) para garantir que apenas o Gateway chame este endpoint.
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'clinleads-dev-secret';

export async function POST(req: Request) {
  try {
    // 1. Validação de Segurança Básica
    // Dependendo do gateway, o token pode vir no header (ex: Authorization ou x-api-key)
    const authHeader = req.headers.get('Authorization') || req.headers.get('x-api-key');
    
    // Para simplificar o MVP, vamos checar um bearer token simples
    if (!authHeader || authHeader.replace('Bearer ', '') !== WEBHOOK_SECRET) {
      console.warn('❌ [Webhook] Tentativa de acesso não autorizada');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Extração do payload recebido do WhatsApp (JSON)
    const body = await req.json();
    
    console.log('✅ [Webhook] Recebido Payload do WhatsApp:', JSON.stringify(body, null, 2));

    // Exemplo de extração baseada na estrutura típica de APIs de WhatsApp
    // Adapte de acordo com a estrutura real que o seu gateway enviar
    const senderNumber = body?.data?.key?.remoteJid || body?.sender;
    const messageContent = body?.data?.message?.conversation || body?.message;

    if (!senderNumber || !messageContent) {
      console.log('⚠️ [Webhook] Payload incompleto ou evento não é uma mensagem de texto.');
      // Retornamos 200 de qualquer forma para o gateway não ficar tentando reenviar indefinidamente
      return NextResponse.json({ received: true, ignored: true }, { status: 200 });
    }

    console.log(`📱 Nova mensagem de ${senderNumber}: "${messageContent}"`);

    // TODO: Integração com Supabase e OpenAI (Próxima etapa)
    // - Buscar ou criar o Lead no Supabase pelo senderNumber
    // - Salvar a mensagem no Supabase
    // - Enviar contexto para a OpenAI e retornar a resposta para o Lead via API do WhatsApp

    // 3. Confirmação de recebimento (Sempre retorne 200 rápido para o Webhook não dar timeout)
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('❌ [Webhook] Erro ao processar:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
