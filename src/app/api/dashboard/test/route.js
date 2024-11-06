export async function GET() {
    console.log('Test API is working!');
    return new Response(JSON.stringify({ message: 'Test successful' }), { status: 200 });
}
