import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";

import { Routes } from "constants/routes";
import { login, verifyEmail } from "api/auth";
import history from "utils/history";
import useAuth from "hooks/useAuth";
import useRequestState from "hooks/useRequestState";

import { Button, Heading, Alert } from "@commitUI/index";
import { Input } from "components/Form";
import LinkButton from "components/LinkButton";

import styles from "./EmailVerification.module.css";
import logo from "assets/images/logo.png";
import logo2 from "assets/images/logo2.jpeg";

interface Values {
  nusnet: string;
  verificationcode: string;
}

const EmailVerification = () => {
  const state = useRequestState();
  const initialValues: Values = {
    nusnet: "",
    verificationcode: "",
  };

  const validationSchema: yup.SchemaOf<Values> = yup.object({
    nusnet: yup.string().required("Required"),
    verificationcode: yup.string().required("Required"),
  });

  // const { userLogin: localLogin } = useAuth(); // Local session login

  const handleEmailVerification = async (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => {
    try {
      state.start();
      const { data: token } = await verifyEmail({
        username: values.nusnet.toLowerCase(),
        verificationcode: values.verificationcode,
      });
      // localLogin(token);
      formikHelpers.setSubmitting(false);
      history.push("/");
    } catch (e) {
      state.setError(
        "The verification code you entered did not match our records. Please try again."
      );
    }
    state.end();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img
            src={logo2}
            alt="nussu welfare logo"
            className={styles.welfare}
          />
          <img src={logo} alt="nussu commIT logo" className={styles.commit} />
        </div>

        <Heading level={1} className={styles.heading}>
          Email Verification
        </Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleEmailVerification}
        >
          <Form>
            {Boolean(state.error) && (
              <Alert
                status="error"
                message={state.error || ""}
                className={styles.error}
              />
            )}

            <Input
              autoFocus
              name="nusnet"
              label="NUSNET ID"
              className={styles.input}
            />

            <Input
              name="verificationcode"
              label="Verification Code"
              // type="password"
              className={styles.input}
            />

            <Button
              className={styles.btn}
              // Click handler is handled by the onSubmit props in the parent Formik component
              isSubmit
              isLoading={state.loading}
            >
              Submit
            </Button>
            {/* TODO: BUTTON SUBMISSION SENDS EMAIL */}
          </Form>
        </Formik>

        <div className={styles.linkTextContainer}>

          <Heading level={4} className={styles.or}>
            <span>or</span>
          </Heading>

          <LinkButton
          // TODO : CHANGE LINK
            to={Routes.register}
            type="outlined"
            className={styles.register}
            size="small"
          >
            Send another email!
          </LinkButton>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
