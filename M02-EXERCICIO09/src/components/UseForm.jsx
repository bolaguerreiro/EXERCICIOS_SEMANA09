// --- EXERCICIO 01 - SEMANA 09
/* Crie um formulário React para cadastro de usuários utilizando React Hook Form. 
    O formulário deve incluir campos para nome, e-mail e senha. */

import { useForm } from "react-hook-form";
import styles from "../components/styles.module.css";

function UserForm() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      idade: 0,
    },
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Nome:{" "}
        </label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Nome do Usuário" {...register("nome")} />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          E-mail:{" "}
        </label>
        <input
          className="form-control" 
          id="exampleFormControlInput1"
          type="email"
          {...register("email")}
          placeholder="name@example.com.br"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Idade: </label>
        <input
          className={`form-control ${errors.idade && "is-invalid"}`}
          id="exampleFormControlInput1"
          aria-invalid={!!errors.idade}
          {...register("idade", {
            min: {
              value: 18,
              message: "Permitido apenas para maiores de 18 anos.",
            },
          })}
        />
        {errors.idade && (
          <span className="text-danger text-xs">{errors.idade.message}</span>
        )}
      </div>
      <div className="mb-3">
        <label>Senha: </label>
        <input type="password" {...register("senha",{
          required: {
            value: true,
            message: "Campo obrigatório",
          }
        })} />
        {errors.senha && (
          <span className="text-danger text-xs">{errors.senha.message}</span>
        )}
      </div>
      <button className="btn btn-primary btn-lg" type="submit" value="Submit">
        Cadastrar
      </button>
    </form>
  );
}

export default UserForm;
