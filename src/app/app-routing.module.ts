import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./authentication/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./authentication/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./authentication/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./shared/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./shared/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./shared/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./shared/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./shared/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'admin-channels',
    loadChildren: () => import('./admin/channels/channels.module').then( m => m.ChannelsPageModule)
  },
  {
    path: 'admin-chat',
    loadChildren: () => import('./admin/admin-chat/admin-chat.module').then( m => m.AdminChatPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'user-detail',
    loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
  },
  {
    path: 'add-book',
    loadChildren: () => import('./pages/add-book/add-book.module').then( m => m.AddBookPageModule)
  },
  {
    path: 'book-detail',
    loadChildren: () => import('./pages/book-detail/book-detail.module').then( m => m.BookDetailPageModule)
  },
  {
    path: 'send-report',
    loadChildren: () => import('./pages/book-detail/send-report/send-report.module').then( m => m.SendReportPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'owner-channels',
    loadChildren: () => import('./pages/owner-channels/owner-channels.module').then( m => m.OwnerChannelsPageModule)
  },
  {
    path: 'owner-chat',
    loadChildren: () => import('./pages/owner-chat/owner-chat.module').then( m => m.OwnerChatPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
