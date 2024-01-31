import { all } from 'redux-saga/effects'
import * as users from './users'
import * as connect from './connect'
import * as navigation from './navigation'
import * as alert from './alert'
import * as address from './address'
import * as categories from './categories'
import * as jobs from './jobs'
import * as support from './support'
import * as term from './term'
import * as verify from './verify'
import * as bank from './bank'
import * as notification from './notification'
import * as evaluation from './evaluation'
import * as gallery from './gallery'
import * as calendar from './calendar'
import * as worker from './worker'
import * as service from './service'
import * as bid from './bid'
import * as payment from './payment'
import * as vendor from './vendor'
import * as storage from './storage'
import * as chat from './chat'
import * as jobWorker from './jobs/worker'
import * as stats from './stats'
import * as toast from './toast'

export default function* rootSaga() {
    yield all([
        toast.toastAction(),
        stats.getStatsAction(),
        jobWorker.getDirectJobsAction(),
        chat.uploadImageAction(),
        chat.retrieveUserChatAction(),
        chat.sendNotificationChatAction(),
        storage.saveInStorageAction(),
        storage.readInStorageAction(),
        vendor.getRunningJobsAction(),
        vendor.getRunningOwnerJobsAction(),
        payment.validationTransactionAction(),
        payment.addPaymentAction(),
        payment.getPaymentHistorialAction(),
        bid.bidActions(),
        service.servicesAction(),
        worker.getWorkersAction(),
        worker.becomeWorkerAction(),
        worker.updateWorkerAction(),
        calendar.getUserCalendarAction(),
        gallery.uploadPhotoAction(),
        gallery.sortGalleryAction(),
        evaluation.getRatingsAction(),
        evaluation.getJobDontEvalAction(),
        evaluation.postRatingAction(),
        evaluation.getEvaluationUserAction(),
        notification.notificationActions(),
        bank.postBankAction(),
        bank.getBankAction(),
        bank.deleteBankAction(),
        connect.singinWithAppleAction(),
        connect.singinWithFacebookAction(),
        connect.singinWithGoogleAction(),
        users.fetchUserProfileAction(),
        users.signupAction(),
        users.currentUserAction(),
        users.logoutAction(),
        users.signinAction(),
        users.getUserAction(),
        users.updateUserAction(),
        users.updateWokerAction(),
        users.uploadUserProfileAction(),
        users.selectAddressAction(),
        navigation.navigateAction(),
        support.postSupportAction(),
        address.getAddressAction(),
        address.getLocationFromAddressAction(),
        address.postAddressAction(),
        address.deleteAddressAction(),
        alert.alertAction(),
        categories.getCategoriesAction(),
        categories.getSubCategoriesAction(),
        jobs.jobsActions(),
        term.fetchTermsaction(),
        verify.sendEmailAction(),
        verify.verifyCodeAction(),
        verify.resetPasswordAction()
    ])
}