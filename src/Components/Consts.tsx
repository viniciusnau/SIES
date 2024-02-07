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

  successRegister: {
    title: "Registro de candidato feito com sucesso!",
    description: "Requisição feita com sucesso!",
    color: "#9fc54d",
  },

  errorRegister: {
    title: "Erro ao efetuar registro de candidato!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  successUpdate: {
    title: "Atualização de candidato feito com sucesso!",
    description: "Requisição feita com sucesso!",
    color: "#9fc54d",
  },

  errorUpdate: {
    title: "Erro ao atualizar registro de candidato!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  errorLogin: {
    title: "Erro ao verificar as credenciais!",
    description: "Certifique se os campos estão corretos.",
    color: "#ff6464",
  },
};

export const public_defenses = [
  "Florianópolis",
  "Palhoça",
  "Sao José",
  "Tubarão",
  "Criciúma",
  "Araranguá",
  "Biguaçu",
  "Itajaí",
  "Balneário Camboriú",
  "Joinville",
  "Jaraguá do Sul",
  "Blumenau",
  "Brusque",
  "Mafra",
  "Rio do Sul",
  "Lages",
  "Curitibanos",
  "Caçador",
  "Campos Novos",
  "Joaçaba",
  "Concordia",
  "Xanxerê",
  "São Lourenço do Oeste",
  "Chapecó",
  "Maravilha",
  "São Miguel do Oeste",
];

export const categories = ["Direito"];

export const stages = [
  { name: "1", property: "1" },
  { name: "2", property: "2" },
];

export const columnsTable = [
  { title: "Nome", property: "blurred_name" },
  { title: "CPF", property: "blurred_social_security_number" },
  { title: "IMAA", property: "academic_index" },
];

export const extraColumnsTable = [
  { title: "Nome", property: "blurred_name" },
  { title: "CPF", property: "blurred_social_security_number" },
  { title: "IMAA", property: "academic_index" },
  { title: "Prova", property: "test_index" },
  { title: "Entrevista", property: "interview_index" },
  { title: "Média", property: "average" },
  { title: "Status", property: "hiring_status" },
];

export const statusList = ["Contratado", "Eliminado"];
