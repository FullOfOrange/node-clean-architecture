create table if not exists ticket
(
    id         bigint auto_increment comment '티켓 id'
        primary key,
    name       varchar(255) not null comment '티켓 이름',
    count      integer      not null comment '티켓 수량',
    created_at datetime(6)  not null comment '등록일시',
    updated_at datetime(6)  not null comment '수정일시',
    deleted_at datetime(6)  null comment '삭제일시'
)
    comment '티켓 테이블, 2022-10-30 by fulloforange';

create table if not exists user
(
    id         bigint auto_increment comment '유저 id'
        primary key,
    name       varchar(255) not null comment '유저 이름',
    created_at datetime(6)  not null comment '등록일시',
    updated_at datetime(6)  not null comment '수정일시',
    deleted_at datetime(6)  null comment '삭제일시'
)
    comment '유저 테이블, 2022-10-30 by fulloforange';

create table if not exists payment_history
(
    id         bigint auto_increment comment '결제 이력 id'
        primary key,
    user_id    bigint       not null comment '유저 id',
    ticket_id  bigint       not null comment '티켓 id',
    count      integer      not null comment '결제 수량',
    created_at datetime(6)  not null comment '등록일시',
    updated_at datetime(6)  not null comment '수정일시',
    deleted_at datetime(6)  null comment '삭제일시'
)
    comment '결제 이력 테이블, 2022-10-30 by fulloforange';