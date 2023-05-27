import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { IForm, categories } from "../atoms";

const Form = styled.form`
  margin: 1em;
  input {
    padding: 0.2em 0.5em;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.textColor};
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
  }
  button {
    display: inline-block;
    margin-left: 1em;
    padding: 0.5em 1em;
    border: none;
    background-color: ${(props) => props.theme.boxColor};
    box-shadow: ${(props) => props.theme.boxShadow};
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    &:hover {
      background-color: transparent;
      transition: 0.3s ease all;
    }
  }

  .error-msg {
    color: red;
    font-weight: bold;
  }
`;

const AddCategoryForm = () => {
  const setCategoryArr = useSetRecoilState(categories);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmitCategory = ({ value }: IForm) => {
    setCategoryArr((oldArr) => {
      return [...oldArr, value];
    });
    setValue("value", "");
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmitCategory)}>
        <input
          type="text"
          placeholder="Write new category"
          {...register("value", {
            required: "Please write category",
            maxLength: {
              value: 10,
              message: "Maximum number of characters is 10.",
            },
          })}
        />
        <button>Add Category</button>
      </Form>
      <span className="error-msg">{errors?.value?.message as string}</span>
    </div>
  );
};

export default AddCategoryForm;
