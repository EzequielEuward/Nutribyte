import { useSelector } from 'react-redux';
import {ReportesAdminPage,ReportesUsuarioPage} from '../components/reportes/';


export const ReportesPage = () => {
  const { rol } = useSelector(state => state.auth);

  if (rol === 'Administrador') return <ReportesAdminPage />;
  return <ReportesUsuarioPage />;
};

export default ReportesPage;
