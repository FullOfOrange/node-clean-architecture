create table if not exists ticket
(
    id                bigint auto_increment comment '티켓 id'
        primary key,
    name              varchar(255) not null comment '티켓 이름',
    count               integer not null comment '티켓 수량',
    created_at        datetime(6) not null comment '등록일시',
    updated_at        datetime(6) not null comment '수정일시',
    deleted_at        datetime(6) null comment '삭제일시'
)
    comment '티켓 테이블, 2022-10-15 by fulloforange';
