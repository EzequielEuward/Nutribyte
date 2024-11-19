import {FoodTable} from "../components/"; 
import {DashboardLayout} from "../layout/DashboardLayout";



export const FoodPage = () => {
  return (
    <DashboardLayout>
      <h1>Tabla de Alimentos</h1>
      <FoodTable />
    </DashboardLayout>
  );
};

export default FoodPage;
