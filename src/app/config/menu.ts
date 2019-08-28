// tslint:disable-next-line:no-shadowed-variable
import { ConfigModel } from '../core/interfaces/config';

// tslint:disable-next-line:no-shadowed-variable
export class MenuConfig implements ConfigModel {
	public config: any = {};

	constructor() {
		this.config = {
			header: {
				self: {},
				items: [
					{
						title: 'Меню',
						root: true,
						icon: 'flaticon-add',
						toggle: 'click',
						// translate: 'MENU.ACTIONS',
						submenu: {
							type: 'classic',
							alignment: 'left',
							items: [
								{
									title: 'Створити нову сторінку',
									root: true,
									icon: 'flaticon-file',
									// title: 'Create New Post',
									// translate: 'MENU.CREATE_POST',
									page: '/ControlPanel/pagesBuilder/newSection'

								},
								// {
								// 	root: true,
								// 	title: 'Створити нове замовлення',
								// 	icon: 'flaticon-file-2',
								// 	// title: 'Create New Order',
								// 	// translate: 'MENU.CREATE_ORDER',
								// 	page: '/ControlPanel/Orders/newOrder'

								// },
								// {
								// 	title: 'Додати користувача',
								// 	// title: 'Register Member',
								// 	// translate: 'MENU.REGISTER_MEMBER',
								// 	icon: 'flaticon-user',
								// 	root: true,
								// 	page: '/ControlPanel/Users/newUser'
								// },
								{
									title: 'Додати клієнта',
									// title: 'Register Client',
									// translate: 'MENU.REGISTER_CLIENT',
									icon: 'flaticon-user',
									root: true,
									page: '/ControlPanel/Clients/newUser'
								},
								{
									title: 'Додати грумера',
									// title: 'Register Client',
									// translate: 'MENU.REGISTER_CLIENT',
									icon: 'flaticon-user',
									root: true,
									page: '/ControlPanel/Grummers/newUser'
								},
								// {
								// 	title: 'Додати питомця',
								// 	// title: 'Register Pet',
								// 	// translate: 'MENU.REGISTER_PET',
								// 	icon: 'flaticon-user',
								// 	root: true,
								// 	page: '/ControlPanel/Pets/newPet'
								// },
								{
									title: 'Завантажити файл',
									// title: 'Upload',
									// translate: 'MENU.UPLOAD',
									icon: 'flaticon-upload',
									root: true,
									page: '/ControlPanel/Upload'
								},
								// {
								// 	title: 'Generate Reports',
								// 	tooltip: 'Non functional dummy link',
								// 	icon: 'flaticon-diagram',
								// 	badge: {
								// 		type: 'm-badge--success',
								// 		value: '2'
								// 	},
								// },
								// {
								// 	title: 'Manage Orders',
								// 	icon: 'flaticon-business',
								// 	submenu: {
								// 		type: 'classic',
								// 		alignment: 'right',
								// 		bullet: 'line',
								// 		items: [
								// 			{
								// 				title: 'Latest Orders',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			},
								// 			{
								// 				title: 'Pending Orders',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			},
								// 			{
								// 				title: 'Processed Orders',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			},
								// 			{
								// 				title: 'Delivery Reports',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			},
								// 			{
								// 				title: 'Payments',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			},
								// 			{
								// 				title: 'Customers',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			}
								// 		]
								// 	}
								// },
								// {
								// 	title: 'Customer Feedbacks',
								// 	tooltip: 'Non functional dummy link',
								// 	icon: 'flaticon-chat-1',
								// 	submenu: {
								// 		type: 'classic',
								// 		alignment: 'right',
								// 		bullet: 'dot',
								// 		items: [
								// 			{
								// 				title: 'Customer Feedbacks',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			},
								// 			{
								// 				title: 'Supplier Feedbacks',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			},
								// 			{
								// 				title: 'Reviewed Feedbacks',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			},
								// 			{
								// 				title: 'Resolved Feedbacks',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			},
								// 			{
								// 				title: 'Feedback Reports',
								// 				tooltip: 'Non functional dummy link',
								// 				icon: '',
								// 			}
								// 		]
								// 	}
								// },
							]
						}
					},
					// {
					// 	title: 'Reports',
					// 	root: true,
					// 	icon: 'flaticon-line-graph',
					// 	toggle: 'click',
					// 	translate: 'MENU.REPORTS',
					// 	submenu: {
					// 		type: 'mega',
					// 		width: '1000px',
					// 		alignment: 'left',
					// 		columns: [
					// 			{
					// 				heading: {
					// 					heading: true,
					// 					title: 'Finance Reports',
					// 				},
					// 				items: [
					// 					{
					// 						title: 'Annual Reports',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: 'flaticon-map',
					// 					},
					// 					{
					// 						title: 'HR Reports',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: 'flaticon-user',
					// 					},
					// 					{
					// 						title: 'IPO Reports',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: 'flaticon-clipboard',
					// 					},
					// 					{
					// 						title: 'Finance Margins',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: 'flaticon-graphic-1',
					// 					},
					// 					{
					// 						title: 'Revenue Reports',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: 'flaticon-graphic-2',
					// 					}
					// 				]
					// 			},
					// 			{
					// 				bullet: 'line',
					// 				heading: {
					// 					heading: true,
					// 					title: 'Project Reports',
					// 				},
					// 				items: [
					// 					{
					// 						title: 'Coca Cola CRM',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title:
					// 							'Delta Airlines Booking Site',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Malibu Accounting',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Vineseed Website Rewamp',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Zircon Mobile App',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Mercury CMS',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					}
					// 				]
					// 			},
					// 			{
					// 				bullet: 'dot',
					// 				heading: {
					// 					heading: true,
					// 					title: 'HR Reports',
					// 				},
					// 				items: [
					// 					{
					// 						title: 'Staff Directory',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Client Directory',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Salary Reports',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Staff Payslips',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Corporate Expenses',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Project Expenses',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					}
					// 				]
					// 			},
					// 			{
					// 				heading: {
					// 					heading: true,
					// 					title: 'Reporting Apps',
					// 					icon: '',
					// 				},
					// 				items: [
					// 					{
					// 						title: 'Report Adjusments',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Sources & Mediums',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Reporting Settings',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Conversions',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Report Flows',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					},
					// 					{
					// 						title: 'Audit & Logs',
					// 						tooltip: 'Non functional dummy link',
					// 						icon: '',
					// 					}
					// 				]
					// 			}
					// 		]
					// 	}
					// },
					// {
					// 	title: 'Apps',
					// 	root: true,
					// 	icon: 'flaticon-paper-plane',
					// 	toggle: 'click',
					// 	translate: 'MENU.APPS',
					// 	badge: {
					// 		type: 'm-badge--brand m-badge--wide',
					// 		value: 'new',
					// 		translate: 'MENU.NEW',
					// 	},
					// 	submenu: {
					// 		type: 'classic',
					// 		alignment: 'left',
					// 		items: [
					// 			{
					// 				title: 'eCommerce',
					// 				icon: 'flaticon-business',
					// 				submenu: {
					// 					type: 'classic',
					// 					alignment: 'right',
					// 					items: [
					// 						{
					// 							title: 'Customers',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-users',
					// 						},
					// 						{
					// 							title: 'Orders',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-interface-1',
					// 						},
					// 						{
					// 							title: 'Products',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-list-1',
					// 						}
					// 					]
					// 				}
					// 			},
					// 			{
					// 				title: 'Audience',
					// 				tooltip: 'Non functional dummy link',
					// 				icon: 'flaticon-computer',
					// 				submenu: {
					// 					type: 'classic',
					// 					alignment: 'right',
					// 					items: [
					// 						{
					// 							title: 'Active Users',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-users',
					// 						},
					// 						{
					// 							title: 'User Explorer',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-interface-1',
					// 						},
					// 						{
					// 							title: 'Users Flows',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-lifebuoy',
					// 						},
					// 						{
					// 							title: 'Market Segments',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-graphic-1',
					// 						},
					// 						{
					// 							title: 'User Reports',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-graphic',
					// 						}
					// 					]
					// 				}
					// 			},
					// 			{
					// 				title: 'Marketing',
					// 				tooltip: 'Non functional dummy link',
					// 				icon: 'flaticon-map',
					// 			},
					// 			{
					// 				title: 'Campaigns',
					// 				tooltip: 'Non functional dummy link',
					// 				icon: 'flaticon-graphic-2',
					// 				badge: {
					// 					type: 'm-badge--success',
					// 					value: '3'
					// 				}
					// 			},
					// 			{
					// 				title: 'Cloud Manager',
					// 				tooltip: 'Non functional dummy link',
					// 				icon: 'flaticon-infinity',
					// 				submenu: {
					// 					type: 'classic',
					// 					alignment: 'left',
					// 					items: [
					// 						{
					// 							title: 'File Upload',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-add',
					// 							badge: {
					// 								type: 'm-badge--danger',
					// 								value: '3'
					// 							}
					// 						},
					// 						{
					// 							title: 'File Attributes',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-signs-1',
					// 						},
					// 						{
					// 							title: 'Folders',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-folder',
					// 						},
					// 						{
					// 							title: 'System Settings',
					// 							tooltip: 'Non functional dummy link',
					// 							icon: 'flaticon-cogwheel-2',
					// 						}
					// 					]
					// 				}
					// 			}
					// 		]
					// 	}
					// }
				]
			},
			aside: {
				self: {},
				items: [
					// {
					// 	title: 'Панель Управління',
					// 	desc: 'Some description goes here',
					// 	root: true,
					// 	icon: 'flaticon-line-graph',
					// 	page: '/ControlPanel',
					// 	badge: { type: 'm-badge--danger', value: '2' },
					// 	// translate: 'MENU.DASHBOARD'
					// },
					// { section: 'Tools' },
					// {
					// 	title: 'Layout Builder',
					// 	root: true,
					// 	icon: 'flaticon-settings',
					// 	page: '/ControlPanel/layoutBuilder'
					// },
					{
						title: 'Замовлення',
						root: true,
						icon: 'flaticon-file-2',
						page: '/ControlPanel/Orders'
					},
					{
						title: 'Користувачі',
						root: true,
						bullet: 'dot',
						icon: 'flaticon-users',
						submenu: [

							{
								title: 'Адміністратори',
								page: '/ControlPanel/Users'
							},
							{
								title: 'Клієнти',
								page: '/ControlPanel/Clients'
							},
							{
								title: 'Грумери',
								page: '/ControlPanel/Grummers'
							}

						]
					},
					{
						title: 'Домашні улюбленці',
						root: true,
						icon: 'flaticon-user',
						page: '/ControlPanel/Pets'
					},
					{
						title: 'Сторінки',
						root: true,
						icon: 'flaticon-settings',
						page: '/ControlPanel/pagesBuilder'
					},
					{
						title: 'Завантаження',
						root: true,
						bullet: 'dot',
						icon: 'flaticon-upload',
						submenu: [
							{
								title: 'Завантажити',
								page: '/ControlPanel/Upload'
							},
							{
								title: 'Зображення',
								page: '/ControlPanel/Upload/UploadImages'
							},
							{
								title: 'Файли',
								page: '/ControlPanel/Upload/UploadFiles'
							}

						]
					},
					// {
					// 	title: 'Завантаження',
					// 	root: true,
					// 	icon: 'flaticon-upload',
					// 	page: '/ControlPanel/Upload'
					// },
					// {
					// 	title: 'Завантажені зображення',
					// 	root: true,
					// 	icon: 'flaticon-upload',
					// 	page: '/ControlPanel/Upload/UploadImages'
					// },
					// {
					// 	title: 'Завантажені файли',
					// 	root: true,
					// 	icon: 'flaticon-upload',
					// 	page: '/ControlPanel/Upload/UploadFiles'
					// }

				]
			},
			asideGrummer: {
				self: {},
				items: [
					{
						title: 'Замовлення',
						root: true,
						icon: 'flaticon-file-2',
						page: '/ControlPanel/Orders'
					}
				]
			}
		};
	}
}
