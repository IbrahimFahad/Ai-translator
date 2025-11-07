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
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
		});
		try {
			const data = await request.json();
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
			return new responsed(e, { headers: corsHeaders });
		}
	},
};
