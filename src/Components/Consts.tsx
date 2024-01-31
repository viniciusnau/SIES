export const snackbarConsts = {
  success: {
    title: "Requisição feita com sucesso!",
    description: "Requisição feita com sucesso!",
    color: "#9fc54d",
  },

  error: {
    title: "Erro ao efetuar a requisição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  loginError: {
    title: "Erro ao tentar entrar na sessão!",
    description: "Usuário e/ou senha podem estar errados.",
    color: "#ff6464",
  },

  resetError: {
    title: "Erro ao redefinir senha!",
    description: "Confira se o email está correto e tente novamente.",
    color: "#ff6464",
  },
  resetSuccess: {
    title: "Requisição feita com sucesso!",
    description: "Acesse o email para finalizar a troca de senha.",
    color: "#9fc54d",
  },

  transcriptError: {
    title: "Erro ao carregar transcrição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  copyError: {
    title: "Erro ao copiar transcrição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },
  copySuccess: {
    title: "Transcrição copiada!",
    description: "",
    color: "#9fc54d",
  },

  transcribeError: {
    title: "Erro ao iniciar transcrição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },
  transcribeExceededError: {
    title: "Limites de agendamentos diário excedido!",
    description: "Tente novamente outro dia.",
    color: "#ff6464",
  },
  transcribeSuccess: {
    title: "Transcrição agendada com sucesso!",
    description: "",
    color: "#9fc54d",
  },
  invalidFileError: {
    title: "Erro ao selecionar o arquivo!",
    description:
      "Formatos de arquivo suportados: MP3, MP4, WAV, FLAC, AMR, OGG.",
    color: "#ff6464",
  },
  sketchError: {
    title: "Erro ao salvar o rascunho!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },
  sketchSuccess: {
    title: "Rascunho salvo com sucesso!",
    description: "",
    color: "#9fc54d",
  },
};

export const public_defenses = [
  { name: "Florianópolis", property: "florianopolis" },
  { name: "Palhoça", property: "palhoca" },
  { name: "Sao José", property: "sao jose" },
  { name: "Tubarão", property: "tubarao" },
  { name: "Criciúma", property: "criciuma" },
  { name: "Araranguá", property: "ararangua" },
  { name: "Biguaçu", property: "biguacu" },
  { name: "Itajaí", property: "itajai" },
  { name: "Balneário Camboriú", property: "balneario camboriu" },
  { name: "Joinville", property: "joinville" },
  { name: "Jaraguá do Sul", property: "jaragua do sul" },
  { name: "Blumenau", property: "blumenau" },
  { name: "Brusque", property: "brusque" },
  { name: "Mafra", property: "mafra" },
  { name: "Rio do Sul", property: "rio do sul" },
  { name: "Lages", property: "lages" },
  { name: "Curitibanos", property: "curitibanos" },
  { name: "Caçador", property: "cacador" },
  { name: "Campos Novos", property: "campos novos" },
  { name: "Joaçaba", property: "joacaba" },
  { name: "Concordia", property: "concordia" },
  { name: "Xanxerê", property: "xanxere" },
  { name: "São Lourenço do Oeste", property: "sao lourenco do oeste" },
  { name: "Chapecó", property: "chapeco" },
  { name: "Maravilha", property: "maravilha" },
  { name: "São Miguel do Oeste", property: "sao miguel do oeste" },
];

export const columnsTable = [
  { title: "Nome", property: "blurred_name" },
  { title: "CPF", property: "blurred_social_security_number" },
  { title: "Nota", property: "average" },
];

export const categories = [{ name: "Direito", property: "direito" }];

export const stages = [
  { name: "1", property: "1" },
  { name: "2", property: "2" },
];
