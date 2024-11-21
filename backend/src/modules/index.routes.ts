import { Router } from 'express';

import AdminPermissionRoutes from './admin-permission/admin-permission.routes';
import AdminRoutes from './admin/admin.routes';
import AuthRoutes from './auth/auth.routes';
import RegisterRoutes from './register/register.routes';
import RideRoutes from './ride/ride.routes';
import UploadFileRoutes from './upload-file/upload-file.routes';

const router = Router();

router.use('/admins/permissions', AdminPermissionRoutes);
router.use('/admins', AdminRoutes);
router.use('/auth', AuthRoutes);
router.use('/registers', RegisterRoutes);
router.use('/ride', RideRoutes);
router.use('/upload-file', UploadFileRoutes);

export default router;
