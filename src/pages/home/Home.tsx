import {
  Description,
  Heading,
  ProjectDetailForm,
  Spacer,
} from "../../component";

function Home() {
  return (
    <div>
      <Heading />
      <Description />
      <Spacer height={50} />
      <ProjectDetailForm />
    </div>
  );
}

export default Home;
