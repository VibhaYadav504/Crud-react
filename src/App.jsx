import { useState } from "react";
import { Form } from "./Form"; 

const App = () => {
  const [data, setData] = useState([]); 

  return (
    <div>
      <h1>Post Form</h1>
      <Form data={data} setData={setData} />
    </div>
  );
};

export default App;
