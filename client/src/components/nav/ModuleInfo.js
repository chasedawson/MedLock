// location of svg files for module icons
// icons taken from: https://material.io/resources/icons/?style=baseline
import MyDataIcon from '../../icons/round-timeline-24px.svg';
import ResourcesIcon from '../../icons/round-folder-24px.svg';
import DashboardIcon from '../../icons/round-home-24px.svg';
import ProfileIcon from '../../icons/round-person-24px.svg';
import MyPatientsIcon from '../../icons/round-people-24px.svg';
import DocumentsIcon from '../../icons/round-description-24px.svg';
import MySurveysIcon from '../../icons/poll-white-18dp.svg';

export const modules = [
    {
        name: 'Dashboard',
        id: 'dashboard', 
        roles: null,
        content: {
            icon: DashboardIcon,
        },
        link: '/dashboard',
    }, 
    // {
    //     name: 'Inbox', 
    //     id: 'inbox',
    //     roles: [
    //         {
    //             name: 'Provider', 
    //             description: 'Access messages from patients and other providers'
    //         }, 
    //         {
    //             name: 'Patient', 
    //             description: 'Access messages from my providers '
    //         }
    //     ], 
    //     content: {
    //         icon: InboxIcon, 
    //     },
    //     link: '/dashboard/inbox'
    // },
    {
        name: 'My Data',
        id: 'mydata',
        roles: [
            {
                name: 'Patient', 
                description: 'Track my medication consumption and pain management '
            }
        ], 
        content:  {
            icon: MyDataIcon,
        },
        link: '/dashboard/mydata'
    },
    {
        name: 'Resources',
        id: 'resources',
        roles: [
            {
                name: 'Provider', 
                description: 'View resources on the latest opioid regulations '
            }, 
            {
                name: 'Patient', 
                description: 'View resources to help maintain sobriety '
            }
        ],  
        content: {
            icon: ResourcesIcon,
        },
        link: '/dashboard/resources'
    }, 
    {
        name: 'My Patients', 
        id: 'mypatients',
        roles: [
            {
                name: 'Provider', 
                description: 'View a list of all your patients ' 
            }
        ], 
        content: {
            icon: MyPatientsIcon, 
        }, 
        link: '/dashboard/mypatients' 
    },
    {
        name: 'Profile',
        id: 'profile',
        roles: [
            {
                name: 'Patient',
                description: 'View and edit your profile '
            },
            {
                name: 'Provider',
                description: 'View and edit your profile '
            }
        ],
        content: {
            icon: ProfileIcon,
        },
        link: '/dashboard/profile'
    },
    {
        name: 'Surveys',
        id: 'surveys',
        roles: [
            {
                name: 'Patient', 
                description: 'Take surveys'
            }
        ], 
        content:  {
            icon: MySurveysIcon,
        },
        link: '/dashboard/survey'
    },
    {
        name: 'Documents',
        id: 'documents',
        roles: [
            {
                name: 'Patient',
                description: 'Upload, store, and access your MedLock documents.'
            }
        ],
        content: {
            icon: DocumentsIcon
        },
        link: '/dashboard/documents'
    }


]