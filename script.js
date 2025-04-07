const SUPABASE_URL = "https://<seu-url>.supabase.co";
const SUPABASE_KEY = "<sua-anon-key>";
const BUCKET_NAME = "comprovantes";

document.getElementById("upload-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const file = document.getElementById("file").files[0];
  const status = document.getElementById("status");

  if (!file || !email) {
    status.innerText = "Preencha todos os campos corretamente.";
    return;
  }

  const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const filePath = `${email}/comprovante.pdf`;

  const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
    cacheControl: '3600',
    upsert: true
  });

  if (error) {
    status.innerText = "Erro ao enviar. Tente novamente.";
  } else {
    status.innerText = "Comprovante enviado com sucesso!";
  }
});
