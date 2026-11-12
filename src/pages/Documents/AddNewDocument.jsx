import { useNavigate } from "react-router-dom";
import DocumentForm from "./DocumentForm";

// The Add New Document page: the form on its own. A saved document goes back to the Document Register,
// where it is listed (with approval On, the list stays as it is until the request is approved).
const AddNewDocument = () => {
  const navigate = useNavigate();

  return (
    <div className='mx-auto w-full max-w-4xl'>
      <DocumentForm onSaved={() => navigate("/documents-register")} />
    </div>
  );
};

export default AddNewDocument;
