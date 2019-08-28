using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CharlieWoof.Data.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MagicPages",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "(newid())"),
                    UpdatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Type = table.Column<byte>(type: "tinyint", nullable: false),
                    Title = table.Column<string>(maxLength: 250, nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Content = table.Column<string>(nullable: false),
                    SeoTitle = table.Column<string>(maxLength: 250, nullable: false),
                    SeoDescription = table.Column<string>(maxLength: 500, nullable: false),
                    Url = table.Column<string>(maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MagicPages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    UpdatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    Id = table.Column<Guid>(nullable: false),
                    Description = table.Column<string>(maxLength: 250, nullable: false),
                    Value = table.Column<string>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "(newid())"),
                    UpdatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Firstname = table.Column<string>(maxLength: 250, nullable: false),
                    Secondname = table.Column<string>(nullable: true),
                    Email = table.Column<string>(maxLength: 250, nullable: false),
                    Phone = table.Column<string>(nullable: true),
                    Role = table.Column<byte>(type: "tinyint", nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    PhotoUrl = table.Column<string>(nullable: true),
                    IsEmailadayType = table.Column<int>(nullable: false),
                    IsMarketingAllowed = table.Column<bool>(nullable: false),
                    IsSendNewsletter = table.Column<bool>(nullable: false),
                    IsGlobalDeactivate = table.Column<bool>(nullable: false),
                    IsRdrQualificationsCorrect = table.Column<bool>(nullable: false),
                    IsRdrStudyQualificationsCorrect = table.Column<bool>(nullable: false),
                    Har = table.Column<string>(nullable: true),
                    ShowMobile = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HistoricalMagicPages",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "(newid())"),
                    UpdatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    MagicPageId = table.Column<Guid>(nullable: false),
                    Type = table.Column<byte>(type: "tinyint", nullable: false),
                    Title = table.Column<string>(maxLength: 250, nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Content = table.Column<string>(nullable: false),
                    SeoTitle = table.Column<string>(maxLength: 250, nullable: false),
                    SeoDescription = table.Column<string>(maxLength: 500, nullable: false),
                    Url = table.Column<string>(maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoricalMagicPages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoricalMagicPages_MagicPages",
                        column: x => x.MagicPageId,
                        principalTable: "MagicPages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MagicFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "(newid())"),
                    UpdatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(maxLength: 250, nullable: false),
                    FileName = table.Column<string>(maxLength: 250, nullable: false),
                    Type = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MagicFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MagicFiles_Users_UpdatedByUserId",
                        column: x => x.UpdatedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HistoricalMagicPages_MagicPageId",
                table: "HistoricalMagicPages",
                column: "MagicPageId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoricalMagicPages_UpdatedByUserId",
                table: "HistoricalMagicPages",
                column: "UpdatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MagicFiles_UpdatedByUserId",
                table: "MagicFiles",
                column: "UpdatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MagicPages_UpdatedByUserId",
                table: "MagicPages",
                column: "UpdatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UpdatedByUserId",
                table: "Users",
                column: "UpdatedByUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HistoricalMagicPages");

            migrationBuilder.DropTable(
                name: "MagicFiles");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "MagicPages");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
