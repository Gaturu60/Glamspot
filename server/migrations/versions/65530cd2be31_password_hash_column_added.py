"""password_hash column added

Revision ID: 65530cd2be31
Revises: 54659c93cc8c
Create Date: 2024-10-21 12:27:59.880386

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '65530cd2be31'
down_revision = '54659c93cc8c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(length=200), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###