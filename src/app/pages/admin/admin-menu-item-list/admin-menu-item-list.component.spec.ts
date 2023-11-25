import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuItemListComponent } from './admin-menu-item-list.component';

describe('AdminMenuItemListComponent', () => {
  let component: AdminMenuItemListComponent;
  let fixture: ComponentFixture<AdminMenuItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenuItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMenuItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
