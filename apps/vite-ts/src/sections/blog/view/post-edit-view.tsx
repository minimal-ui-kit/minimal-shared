import type { IPostItem } from 'src/types/blog';

import { CustomBreadcrumbs } from 'private-ui/components/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { PostNewEditForm } from '../post-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  post?: IPostItem;
};

export function PostEditView({ post }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Blog', href: paths.dashboard.post.root },
          { name: post?.title },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <PostNewEditForm currentPost={post} />
    </DashboardContent>
  );
}
