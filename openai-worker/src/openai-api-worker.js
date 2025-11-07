import OpenAI from 'openai';

export default {
	async fetch(request, env, ctx) {
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
		});
		try {
			const response = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages: [{ role: 'user', content: 'Should I trust stock predictions from Dodgy Dave?' }],
				temperature: 1.1,
			});
			const responsed = response.choices[0].message.content;
			return new Response(JSON.stringify(responsed));
		} catch (error) {
			return new responsed(e);
		}
	},
};
