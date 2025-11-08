import OpenAI from 'openai';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};
export default {
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ error: `${request.method} method not allowed.` }), { status: 405, headers: corsHeaders });
		}

		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
			baseURL: 'https://gateway.ai.cloudflare.com/v1/1433d8205e17a783fa1805576eb2de76/ai-translator/openai',
		});
		try {
			const data = await request.json();
			delete data.request_id;
			const userContent = data.content;
			const messages = [
				{
					role: 'system',
					content:
						'You are an expert multilingual translator specializing in French, Spanish, and Japanese. When the user provides text and specifies a target language',
				},
				{
					role: 'user',
					content: userContent,
				},
			];

			const response = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages: messages,
				temperature: 1.1,
			});
			const responsed = response.choices[0].message.content;
			return new Response(JSON.stringify(responsed), { headers: corsHeaders });
		} catch (error) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: corsHeaders,
			});
		}
	},
};
