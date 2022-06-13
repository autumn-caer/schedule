import React, { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import ConfirmModal from "../atoms/confirm_modal";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import * as FIREBASE_FUNC from "../utils/firebase_function";
type Inputs = {
  email: string;
  password: string;
  confirm_password: string;
};

const SignUp = () => {
  const { login, email, uid } = useTypedSelector((state) => state.login);

  const { signUp } = useActions();
  const [show_modal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const defaultValues = useMemo(() => {
    return {
      email: "",
      password: "",
      confirm_password: "",
    };
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setShowModal(true);
  };

  const signUpFirebase = async () => {
    const user_info = await FIREBASE_FUNC.signUpFirebase(
      watch("email"),
      watch("password")
    );

    if (user_info.error_message) {
      alert(user_info.error_message);
      setShowModal(false);
      return;
    }

    signUp(user_info.email, user_info.uid);
    setShowModal(false);
    navigate("/");
  };

  return (
    <div>
      <div className="columns">
        <div className="column frame_color_light_orange prev">
          <div style={{ borderBottomColor: "rgb(150, 105, 73);" }}>prev</div>
        </div>
        <div className="column is-three-quarters frame_color_light_gray">
          <div className="is-parent">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="columns">
                <div className="column"></div>
                <div className="column is-three-quarters">
                  <div className="title is-1">Sign Up</div>
                  <div className="field">
                    <div className="control">
                      <label className="label">email</label>
                      <input
                        className="input is-rounded"
                        type="text"
                        placeholder="Text input"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <p className="help is-danger">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">password</label>
                      <input
                        className="input is-rounded"
                        type="text"
                        placeholder="Text input"
                        {...register("password", { required: true })}
                      />
                      {errors.password && (
                        <p className="help is-danger">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">confirm_password</label>
                      <input
                        className="input is-rounded"
                        type="text"
                        placeholder="Text input"
                        {...register("confirm_password", { required: true })}
                      />
                      {errors.confirm_password && (
                        <p className="help is-danger">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-one-fifth">
                      <button
                        className="button is-medium is-responsive"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="column is-one-fifth">
                      <button
                        className="button is-medium is-responsive"
                        onClick={() => navigate("/")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                <div className="column"></div>
              </div>
            </form>
          </div>
        </div>
        <div className="column frame_color_light_pink next">
          <div style={{ borderBottomColor: "rgb(150, 105, 73);" }}>next</div>
        </div>
      </div>
      <ConfirmModal
        show_modal={show_modal}
        setShowModal={setShowModal}
        confirmSubmit={signUpFirebase}
      />
    </div>
  );
};

export default SignUp;
