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

  successDeleteUser: {
    title: "Candidato excluido com sucesso!",
    description: "Exclusão feita com sucesso!",
    color: "#9fc54d",
  },

  errorDeleteUser: {
    title: "Erro ao excluir candidato!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  errorPostCandidate: {
    title: "Erro ao criar candidato!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  errorGetCandidates: {
    title: "Erro ao carregar a lista de candidatos!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  errorEditCandidate: {
    title: "Erro ao alterar informações do candidato!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  successDeleteCandidate: {
    title: "Candidato excluido com sucesso!",
    description: "Exclusão feita com sucesso!",
    color: "#9fc54d",
  },

  errorDeleteCandidate: {
    title: "Erro ao excluir candidato!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },
};

export const public_defenses = [
  "Florianópolis",
  "Palhoça",
  "São José",
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
  "Concórdia",
  "Xanxerê",
  "São Lourenço do Oeste",
  "Chapecó",
  "Maravilha",
  "São Miguel do Oeste",
];

export const hiring_status = [
  "pendente",
  "contratado",
  "eliminado",
  "aprovado",
  "reprovado",
  "em contratação",
];

export const ptToEnStatus = {
  pendente: "pending",
  contratado: "hired",
  eliminado: "rejected",
  aprovado: "approved",
  reprovado: "failed",
  "em contratação": "hiring",
};

export const EnToPtStatus = {
  pending: "pendente",
  hired: "contratado",
  rejected: "eliminado",
  approved: "aprovado",
  failed: "reprovado",
  hiring: "em contratação",
};

export const categories = ["Direito", "Administração", "Tecnologia e sistemas da informação"];

export const stages = [
  { name: "1", property: "1" },
  { name: "2", property: "2" },
];

export const columnsTable = [
  { title: "Nome", property: "blurred_name" },
  { title: "CPF", property: "blurred_social_security_number" },
  { title: "IMAA", property: "academic_index" },
  { title: "Status", property: "hiring_status" },
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

export const statusListTable = {
  hired: "Contratado",
  approved: "Aprovado",
  failed: "Reprovado",
  rejected: "Eliminado",
  hiring: "Em contratação",
};

export const statusList = [
  { name: "Aprovado", property: "approved" },
  { name: "Reprovado", property: "failed" },
  { name: "Contratado", property: "hired" },
  { name: "Eliminado", property: "rejected" },
  { name: "Em contratação", property: "hiring" },
];

export const modalText = {
  deleteCandidate: {
    title: "Excluir candidato",
    description: "Você tem certeza que deseja excluir esse candidato?",
    button: "Excluir",
  },
};

export const candidatesColumns = [
  {
    title: "Nome",
    property: "name",
  },
  {
    title: "CPF",
    property: "social_security_number",
  },
  {
    title: "Data de nascimento",
    property: "birth_date",
  },
  {
    title: "Matrícula",
    property: "registration",
  },
  {
    title: "Curso",
    property: "category",
  },
  { title: "Defensoria", property: "public_defense" },
  {
    title: "IMAA",
    property: "academic_index",
  },
  {
    title: "Nota da prova",
    property: "test_index",
  },
  {
    title: "Nota da entrevista",
    property: "interview_index",
  },
  {
    title: "Status",
    property: "hiring_status",
  },
  {
    title: "Média",
    property: "average",
  },
  {
    title: "Editar",
    property: "edit",
  },
];
