import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExamplePage from '../teacher/component/ExampleData';
import StudentForm from '../teacher/component/StudentForm';
type RouteInfo = {
  path: string;
  label: string;
  id?: string;
  superParent?: true;
  icon?: string;
  children: RouteInfo[];
  component?: React.ComponentType; // Add a component property
} | {
  path: string;
  icon: string;
  label: string;
  id?: string;
  superParent?: boolean;
  children?: RouteInfo[];
  component?: React.ComponentType; // Add a component property
};
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    icon: 'home',
    label: 'Title',
    // component: StudentForm,
  },
  {
    path: 'inbox',
    icon: 'inbox',
    label: 'Inbox',
    component: ExamplePage, // Specify the component
  },
  {
    path: 'outbox',
    icon: 'outbox',
    label: 'Outbox',
  },
    // {
    //   path: 'documents',
    //   icon: 'file_copy',
    //   label: 'document.title',
    // },
    {
      path: 'views',
      superParent: true,
      label: 'views',
      icon:'Views',
      children: [
        {
          path: 'general-views',
          icon: 'visibility',
          label: 'GeneralViews',
          children: [
            {
              path: 'new-submissions',
              icon: 'post_add',
              label: 'New Submission',
              component:ExamplePage,
            },
            {
              path: 'subject-classified',
              icon: 'lock',
              label: 'Subject Classified',
            },
            {
              path: 'subject-filed',
              icon: 'task',
              label: 'Subject Filed',
            },
            {
              path: 'postage-book',
              icon: 'outgoing_mail',
              label: 'Postage Book',
            },
            {
              path: 'post-received',
              icon: 'move_to_inbox',
              label: 'Post Received',
            },
            {
              path: 'deadline-ended',
              icon: 'hourglass_top',
              label: 'Deadline Ended',
            },
            {
              path: 'my-subjects',
              icon: 'account_box',
              label: 'My Subjects',
            },
            {
              path: 'locked-documents',
              icon: 'key',
              label: 'Locked Documents',
            },
          ],
        },
        {
          path: 'at-work',
          icon: 'work',
          label: 'At Work',
          children: [
            {
              path: 'work-in-court',
              icon: 'description',
              label: 'Work In Court',
            },
            {
              path: 'work-court-merit',
              icon: 'description',
              label: 'Work Court Merit',
            },
            {
              path: 'work-court-preliminary',
              icon: 'description',
              label: 'Work Court Preliminary',
            },
            {
              path: 'work-court-ip',
              icon: 'description',
              label: 'Work Court IP',
            },
            {
              path: 'work-court-iip',
              icon: 'description',
              label: 'Work Court IIP',
            },
          ],
        },
        {
          path: 'constitutional-court',
          icon: 'account_balance',
          label: 'ConstitutionalCourt',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'CandidatesForSession',
            },
          ],
        },
        {
          path: 'great-council',
          icon: 'groups',
          label: 'GreatCouncil',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'great-council-II',
          icon: 'groups',
          label: 'greatCouncilII',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'CandidatesForSession',
            },
          ],
        },
        {
          path: 'council-I',
          icon: 'groups',
          label: 'councilI',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'CandidatesForSession',
            },
          ],
        },
        {
          path: 'council-II',
          icon: 'groups',
          label: 'councilII',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'council-III',
          icon: 'groups',
          label: 'councilIII',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'council-IV',
          icon: 'groups',
          label: 'councilIV',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'council-V',
          icon: 'groups',
          label: 'councilV',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'civil-law-committee',
          icon: 'diversity_3',
          label: 'civilLawCommittee',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'civil-law-committee-I',
          icon: 'diversity_3',
          label: 'civilLawCommitteeI',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'civil-law-committee-II',
          icon: 'diversity_3',
          label: 'civilLawCommitteeII',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'criminal-law-committee',
          icon: 'diversity_3',
          label: 'criminalLawCommittee',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'administrative-law-committee',
          icon: 'diversity_3',
          label: 'administrativeLawCommittee',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'prior-control-board',
          icon: 'diversity_3',
          label: 'priorControlBoard',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
          ],
        },
        {
          path: 'editorial-board',
          icon: 'supervised_user_circle',
          label: 'editorialBoard',
          children: [
            {
              path: 'candidates-for-session',
              icon: 'group',
              label: 'candidatesForSession',
            },
            {
              path: 'signature',
              icon: 'edit_square',
              label: 'Signature',
            },
          ],
        },
        {
          path: 'exchange',
          icon: 'change_circle',
          label: 'Exchange',
          children: [
            {
              path: 'sent-messages',
              icon: 'outgoing_mail',
              label: 'Sent Messages',
            },
            {
              path: 'received-messages',
              icon: 'inbox',
              label: 'Received Messages',
            },
            {
              path: 'received-items',
              icon: 'inbox',
              label: 'Received Items',
            },
          ],
        },
      ],
    },
  
    {
      path: 'searches',
      icon: 'search',
      superParent: true,
      label: 'Searches',
      children: [
        {
          path: 'active-subject-search',
          icon: 'content_paste_search',
          label: 'Active Subject',
        },
        {
          path: 'archived-items-search',
          icon: 'archived',
          label: 'ArchivedItems',
        },
        {
          path: 'subject-search',
          icon: 'folder',
          label: 'Subject Active Archived',
        },
        {
          path: 'dispatch-book-search',
          icon: 'folder',
          label: 'Dispatch Book',
        },
        {
          path: 'judicial-practice-search',
          icon: 'gavel',
          label: 'Judicial Practice',
        },
        {
          path: 'judicial-practice-normative-search',
          icon: 'gavel',
          label: 'Judicial Practice Normative',
        },
        {
          path: 'court-practice-all-search',
          icon: 'gavel',
          label: 'CourtPracticeAll',
        },
        {
          path: 'court-practice-text-search',
          icon: 'manage_search',
          label: 'Court Practice Text',
        },
      ],
    },
    {
      path: 'administration',
      icon: 'construction',
      superParent: true,
      label: 'Administration',
      children: [
        {
          path: 'user-management',
          icon: 'supervisor_account',
          label: 'User Management',
        },
      ],
    },
    {
      path: 'cabinates',
      icon: 'search',
      superParent: true,
      label: 'cabinates',
      children: [
        {
          path: 'trash',
          icon: 'delete',
          label: 'Trash',
        },
        {
          path: 'office',
          icon: 'content_paste_search',
          label: 'office',
          children: [
            {
              path: 'archive',
              icon: 'archive',
              label: 'Archive',
            },
            {
              path: 'deliveryBook',
              icon: 'local_post_office',
              label: 'DeliveryBook',
            },
            {
              path: 'electronicAppeals',
              icon: 'dvr',
              label: 'ElectronicAppeals',
            },
            {
              path: 'migrantSessions',
              icon: 'animation',
              label: 'MigrantSessions',
            },
            {
              path: 'migratedItems',
              icon: 'move_down',
              label: 'MigratedItems',
            },
            {
              path: 'shippingBook',
              icon: 'menu_book',
              label: 'ShippingBook',
            },
            {
              path: 'submissions',
              icon: 'upload_file',
              label: 'Submissions',
            },
            {
              path: 'specialSubjects',
              icon: 'summarize',
              label: 'SpecialSubjects',
            },
            {
              path: 'subjects',
              icon: 'description',
              label: 'Subjects',
            },
            {
              path: 'itemsProcessing',
              icon: 'file_open',
              label: 'ItemsProcessing',
            },
            {
              path: 'deadlines',
              icon: 'schedule',
              label: 'Deadlines',
            },
            {
              path: 'completedCourses',
              icon: 'task',
              label: 'CompletedCourses',
            },
          ],
        },
        {
          path: 'sessions',
          id: 'sessions',
          superParent: true,
          icon: 'diversity_3',
          label: 'Sessions',
        },
      ],
    },
  ];