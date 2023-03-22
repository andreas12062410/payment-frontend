import { useState } from "react";
import {
  Description,
  Heading,
  ProjectDetailForm,
  Spacer,
} from "../../component";

interface Props {
  showInvoice: { projectIdentifier: string; isLoggedIn: boolean };
  setShowInvoice: (data: {
    projectIdentifier: string;
    isLoggedIn: boolean;
  }) => void;
}
function Home({ showInvoice, setShowInvoice }: Props) {
  return (
    <>
      <Heading />
      <Description />
      <Spacer height={50} />
      <ProjectDetailForm {...{ showInvoice, setShowInvoice }} />
    </>
  );
}

export default Home;
