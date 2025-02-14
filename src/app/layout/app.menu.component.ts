import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'UI Components',
                items: [
                    {
                        label: 'Form Layout',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/formlayout'],
                    },
                    {
                        label: 'Input',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/input'],
                    },
                    {
                        label: 'Float Label',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['/floatlabel'],
                    },
                    {
                        label: 'Invalid State',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/invalidstate'],
                    },
                    {
                        label: 'Button',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/button'],
                    },
                    {
                        label: 'Table',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/table'],
                    },
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/list'],
                    },
                    {
                        label: 'Tree',
                        icon: 'pi pi-fw pi-share-alt',
                        routerLink: ['/tree'],
                    },
                    {
                        label: 'Panel',
                        icon: 'pi pi-fw pi-tablet',
                        routerLink: ['/panel'],
                    },
                    {
                        label: 'Overlay',
                        icon: 'pi pi-fw pi-clone',
                        routerLink: ['/overlay'],
                    },
                    {
                        label: 'Media',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/media'],
                    },
                    {
                        label: 'Menu',
                        icon: 'pi pi-fw pi-bars',
                        routerLink: ['/menu'],
                        routerLinkActiveOptions: {
                            paths: 'subset',
                            queryParams: 'ignored',
                            matrixParams: 'ignored',
                            fragment: 'ignored',
                        },
                    },
                    {
                        label: 'Message',
                        icon: 'pi pi-fw pi-comment',
                        routerLink: ['/message'],
                    },
                    {
                        label: 'File',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/file'],
                    },
                    {
                        label: 'Chart',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/charts'],
                    },
                    {
                        label: 'Misc',
                        icon: 'pi pi-fw pi-circle',
                        routerLink: ['/misc'],
                    },
                ],
            },
            {
                label: 'Prime Blocks',
                items: [
                    {
                        label: 'Free Blocks',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/blocks'],
                        badge: 'NEW',
                    },
                    {
                        label: 'All Blocks',
                        icon: 'pi pi-fw pi-globe',
                        url: ['https://www.primefaces.org/primeblocks-ng'],
                        target: '_blank',
                    },
                ],
            },
            {
                label: 'Utilities',
                items: [
                    {
                        label: 'PrimeIcons',
                        icon: 'pi pi-fw pi-prime',
                        routerLink: ['/icons'],
                    },
                    {
                        label: 'PrimeFlex',
                        icon: 'pi pi-fw pi-desktop',
                        url: ['https://www.primefaces.org/primeflex/'],
                        target: '_blank',
                    },
                ],
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing'],
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['login'],
                            },
                            {
                                label: 'Register',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['register'],
                            },
                            {
                                label: 'FingerPrint',
                                icon: 'pi pi-fw pi-fingerprint',
                                routerLink: ['fingerprint'],
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['error'],
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['access'],
                            },
                        ],
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/crud'],
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/timeline'],
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound'],
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/empty'],
                    },
                    {
                        label: 'Add Employee',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/add-employee'],
                    },
                    {
                        label: 'View Employee',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/view-employee'],
                    },
                    {
                        label: 'Employee Attendence',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/employee-attendence'],
                    },
                ],
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 1.1.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                    {
                                        label: 'Submenu 1.1.2',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                    {
                                        label: 'Submenu 1.1.3',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 1.2.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 2.1.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                    {
                                        label: 'Submenu 2.1.2',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 2.2.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-question',
                        routerLink: ['/documentation'],
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-search',
                        url: ['https://github.com/primefaces/sakai-ng'],
                        target: '_blank',
                    },
                ],
            },
        ];
    }
}
