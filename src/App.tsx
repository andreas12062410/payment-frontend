import { SyntheticEvent, useState } from "react";

import { Spacer } from "./component";
import { FormPayload, useFormSubmitHook } from "./hooks/form";

import "./App.css";

import leftBg from "./assets/Images//bg-left.svg";
import rightBg from "./assets/Images/bg-right.svg";
import { Input } from "./component/input/Input";
import { Select } from "./component/select/Select";
import { useGetBudgetHook } from "./hooks/budget";
import { useCheckoutHook } from "./hooks/milestone";

interface MileStone {
  key: string;
  value: string;
}

function App() {
  const formSubmit = useFormSubmitHook();
  const getBudget = useGetBudgetHook();
  const checkoutStripe = useCheckoutHook();
  const [milestones, setMilestones] = useState();
  const [budget, setBudget] = useState(0);
  const [selectedMilestone, setSelectedMilestones] = useState<MileStone>();
  const [form, setForm] = useState<FormPayload>({
    apiKey: "",
    projectIdentifier: "",
  });

  const handleSubmitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    const response = await formSubmit(form);
    setMilestones(response.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
  };

  const onSelectChange = async (data: any) => {
    setSelectedMilestones({ ...data });
    const res = await getBudget({
      ...form,
      milestoneIdentifier: data.value.mileStoneId,
    });
    setBudget(res.data);
  };

  const handlePay = async () => {
    // milestoneTitle, milestoneUnitAmount, milestoneImages;
    if (selectedMilestone) {
      const milestoneName = Object.keys(selectedMilestone)[0];
      const res = await checkoutStripe({
        milestoneTitle: milestoneName,
        milestoneImages: [],
        milestoneUnitAmount: budget.toString(),
      });
      if (res.data) {
        window.location.href = res.data;
      }
      console.log(res);
    }
  };

  return (
    <div className="app flex-center">
      <img src={leftBg} className="left-bg" alt="" />
      <img src={rightBg} className="right-bg" alt="" />
      <form className="login-container flex-center" onSubmit={handleSubmitForm}>
        <h1>THANK YOU FOR CHOOSING KODERS</h1>
        <Spacer height={40} />
        <h2>Enter Details</h2>
        <Spacer height={40} />
        {milestones ? (
          <>
            <Select
              {...{
                onSelectChange,
                optionsList: milestones,
                selectValue: selectedMilestone?.key,
              }}
            />
            {budget && <button onClick={handlePay}>Pay ₹{budget}</button>}
          </>
        ) : (
          <>
            <Input
              {...{
                placeholder: "Project ID",
                name: "projectIdentifier",
                value: form.projectIdentifier,
                handleChange: handleChange,
              }}
            />
            <Spacer height={30} />
            <Input
              {...{
                type: "text",
                name: "apiKey",
                placeholder: "API key",
                value: form.apiKey,
                handleChange: handleChange,
              }}
            />
            <Spacer height={30} />
            <button type="submit">Fetch Milestone</button>
          </>
        )}
      </form>
    </div>
  );
}

export default App;
