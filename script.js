const { createClient } = supabase;

const SUPABASE_URL = "https://cezrnjvcielbalvohyfo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlenJuanZjaWVsYmFsdm9oeWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMTA1OTAsImV4cCI6MjA0NDc4NjU5MH0._Ny6cJaZHlPIdxLBvJtJGERVKV9WyvtbnHKR99wz9zE";
const BUCKET_NAME = "documentos";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById("upload-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const file = document.getElementById("file").files[0];
  const status = document.getElementById("status");

  if (!file || !email) {
    status.innerText = "Preencha todos os campos corretamente.";
    return;
  }

  const filePath = `${email}/comprovante.pdf`;

  const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
    cacheControl: '3600',
    upsert: true
  });

  if (error) {
    status.innerText = "Erro ao enviar. Tente novamente.";
    console.error(error);
  } else {
    status.innerText = "Comprovante enviado com sucesso!";
  }
});
